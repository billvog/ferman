import { ChatMessageValidationSchema } from "@ferman-pkgs/common";
import { Chat } from "../entity/Chat";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import {
  DELETE_CHAT_MESSAGE_KEY,
  NEW_CHAT_MESSAGE_KEY,
  UPDATE_CHAT_MESSAGE_KEY,
  UPDATE_MY_USER_KEY,
} from "../constants";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { chatAuth } from "../middleware/chatAuth";
import { pubsub } from "../MyPubsub";
import { MyContext } from "../types/MyContext";
import {
  NewMessagePayload,
  OnMessageDeletedPayload,
  OnMessageUpdatedPayload,
} from "./Chat";
import { FieldError } from "./FieldError";
import { onMyUserUpdatePayload } from "./User";
import { queuePushNotifToSend } from "../utils/pushNotifications";

@ObjectType()
class PaginatedMessages {
  @Field(() => [Message])
  messages: Message[];
  @Field()
  hasMore: boolean;
  @Field(() => Int)
  count: number;
  @Field()
  executionTime: number;
}

@ObjectType()
export class MinimalMessageIdResponse {
  @Field(() => Int, { nullable: true })
  messageId?: number;
  @Field(() => Boolean)
  error: boolean;
}

@ObjectType()
export class MinimalMessageResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;
  @Field(() => Boolean)
  error: boolean;
}

@ObjectType()
export class MessageResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@InputType()
export class MessageInput {
  @Field()
  text: string;
}

@Resolver(() => Message)
export class MessageResolver {
  // USER
  @FieldResolver(() => User)
  user(@Root() message: Message, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(message.userId);
  }

  // GET MESSAGES
  @UseMiddleware(chatAuth)
  @Query(() => PaginatedMessages)
  async messages(
    @Arg("chatId", () => String) chatId: string,
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number
  ): Promise<PaginatedMessages> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Message)
      .createQueryBuilder("m")
      .where("m.chatId = :chatId", {
        chatId,
      })
      .orderBy('m."createdAt"', "DESC")
      .take(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.skip(skip);
    }

    const [messages, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      messages: messages.slice(0, realLimit),
      hasMore: messages.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // SEND MESSAGE
  @UseMiddleware(chatAuth)
  @Mutation(() => MessageResponse)
  async sendMessage(
    @Arg("chatId", () => String) chatId: string,
    @Arg("options", () => MessageInput) options: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<MessageResponse> {
    try {
      const validation = await ChatMessageValidationSchema.validate(options);
      options = validation;
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    let message: Message;
    try {
      message = Message.create({
        chatId,
        userId: req.session.userId,
        text: options.text,
      });

      await Message.insert(message);

      pubsub.publish(NEW_CHAT_MESSAGE_KEY, {
        chatId,
        onNewMessage: message,
      } as NewMessagePayload);

      (async () => {
        const chat = await Chat.findOne(chatId);
        if (!chat) return;

        const user = await User.findOne(
          chat.senderId === req.session.userId ? chat.recieverId : chat.senderId
        );
        if (!user) return;

        pubsub.publish(UPDATE_MY_USER_KEY, {
          onMyUserUpdate: user,
        } as onMyUserUpdatePayload);

        queuePushNotifToSend({
          idToSendTo: user.id,
          otherId: req.session.userId,
          type: "message",
          text: message.text.slice(0, 100),
        });
      })();
    } catch (error) {
      return {
        error: {
          field: "_",
          message: "errors.500",
        },
      };
    }

    return {
      message,
    };
  }

  // DELETE MESSAGE
  @UseMiddleware(chatAuth)
  @Mutation(() => MinimalMessageIdResponse)
  async deleteMessage(
    @Arg("chatId", () => String) chatId: string,
    @Arg("messageId", () => Int) messageId: number,
    @Ctx() { req }: MyContext
  ): Promise<MinimalMessageIdResponse> {
    const message = await Message.findOne({
      where: {
        id: messageId,
        chatId,
        userId: req.session.userId,
      },
    });

    if (!message) {
      return {
        error: true,
      };
    }

    try {
      await message.remove();
      await pubsub.publish(DELETE_CHAT_MESSAGE_KEY, {
        chatId,
        onMessageDeleted: messageId,
      } as OnMessageDeletedPayload);

      (async () => {
        const chat = await Chat.findOne(chatId);
        if (!chat) return;
        const user = await User.findOne(
          chat.senderId === req.session.userId ? chat.recieverId : chat.senderId
        );
        pubsub.publish(UPDATE_MY_USER_KEY, {
          onMyUserUpdate: user,
        } as onMyUserUpdatePayload);
      })();
    } catch (e) {
      console.log(e);
      return { error: true };
    }

    return {
      error: false,
      messageId: messageId,
    };
  }

  // MARK MESSAGE READ
  @UseMiddleware(chatAuth)
  @Mutation(() => MinimalMessageResponse)
  async markMessageRead(
    @Arg("chatId", () => String) chatId: string,
    @Arg("messageId", () => Int) messageId: number,
    @Ctx() { req }: MyContext
  ): Promise<MinimalMessageResponse> {
    const message = await Message.findOne({
      where: {
        id: messageId,
        chatId: chatId,
      },
    });

    if (!message || message.userId === req.session.userId) {
      return {
        error: true,
      };
    }

    message.read = true;
    await message.save();

    pubsub.publish(UPDATE_CHAT_MESSAGE_KEY, {
      chatId: message.chatId,
      onMessageUpdated: message,
    } as OnMessageUpdatedPayload);

    (async () => {
      const user = await User.findOne(req.session.userId);
      pubsub.publish(UPDATE_MY_USER_KEY, {
        onMyUserUpdate: user,
      } as onMyUserUpdatePayload);
    })();

    return {
      message,
      error: false,
    };
  }
}
