import { Chat } from "../entity/Chat";
import {
  Arg,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
  Ctx,
  Field,
  FieldResolver,
  Root,
  Query,
  InputType,
  Subscription,
  Int,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import {
  NEW_CHAT_MESSAGE_KEY,
  UPDATE_CHAT_KEY,
  UPDATE_CHAT_MESSAGE_KEY,
  UPDATE_MY_USER_KEY,
} from "../constants";
import { withFilter } from "graphql-subscriptions";
import { chatAuth } from "../middleware/chatAuth";
import { FieldError } from "./FieldError";
import { pubsub } from "../MyPubsub";
import { getConnection, Not } from "typeorm";
import { ChatMessageValidationSchema } from "@ferman-pkgs/common";
import e from "express";
import { onUserUpdatePayload } from "./User";

@ObjectType()
export class ChatResponse {
  @Field(() => Chat, { nullable: true })
  chat?: Chat;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@ObjectType()
export class MinimalChatResponse {
  @Field(() => Chat, { nullable: true })
  chat?: Chat;

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

@ObjectType()
export class PaginatedChats {
  @Field(() => [Chat])
  chats: Chat[];
  @Field()
  hasMore: boolean;
  @Field(() => Int)
  count: number;
  @Field()
  executionTime: number;
}

export type NewMessagePayload = {
  chatId: string;
  onNewMessage: Message;
};

@Resolver(() => Chat)
export class ChatResolver {
  // SENDER
  @UseMiddleware(chatAuth)
  @FieldResolver(() => User)
  sender(@Root() chat: Chat, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(chat.senderId);
  }

  // RECIEVER
  @UseMiddleware(chatAuth)
  @FieldResolver(() => User)
  reciever(@Root() chat: Chat, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(chat.recieverId);
  }

  // LATEST MESSAGE
  @UseMiddleware(chatAuth)
  @FieldResolver(() => Message, { nullable: true })
  latestMessage(@Root() chat: Chat) {
    return Message.findOne({
      where: {
        chatId: chat.id,
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  @UseMiddleware(chatAuth)
  @FieldResolver(() => Boolean)
  async hasUnreadMessage(@Root() chat: Chat, @Ctx() { req }: MyContext) {
    const m = await Message.find({
      where: {
        chatId: chat.id,
        userId: Not(req.session.userId),
        read: false,
      },
    });

    return m.length > 0;
  }

  @UseMiddleware(chatAuth)
  @Subscription(() => Message, {
    nullable: true,
    subscribe: withFilter(
      () =>
        pubsub.asyncIterator([NEW_CHAT_MESSAGE_KEY, UPDATE_CHAT_MESSAGE_KEY]),
      (payload, args) => payload.chatId === args.chatId
    ),
  })
  onNewMessage(
    @Root() payload: NewMessagePayload,
    @Arg("chatId", () => String) _: string
  ): Message | null {
    return payload.onNewMessage;
  }

  @UseMiddleware(chatAuth)
  @Query(() => MinimalChatResponse)
  async chat(
    @Arg("chatId", () => String) chatId: string,
    @Ctx() { req }: MyContext
  ): Promise<MinimalChatResponse> {
    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
    });

    if (
      !chat ||
      (chat.senderId !== req.session.userId &&
        chat.recieverId !== req.session.userId)
    ) {
      return { error: true };
    }

    return { chat, error: false };
  }

  @UseMiddleware(isAuth)
  @Query(() => PaginatedChats)
  async chats(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedChats> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Chat)
      .createQueryBuilder("c")
      .where('c."senderId" = :userId or c."recieverId" = :userId', {
        userId: req.session.userId,
      })
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [chats, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      chats: chats.slice(0, realLimit),
      hasMore: chats.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ChatResponse)
  async createChat(
    @Arg("reciever_uid", () => String) reciever_uid: string,
    @Ctx() { req }: MyContext
  ): Promise<ChatResponse> {
    const sender = await User.findOne(req.session.userId);
    const reciever = await User.findOne({
      where: {
        uid: reciever_uid,
      },
    });

    if (!sender) {
      return {
        error: {
          field: "_",
          message: "errors.500",
        },
      };
    }

    if (!reciever) {
      return {
        error: {
          field: "reciever_uid",
          message: "chat.create_chat.errors.reciever_404",
        },
      };
    }

    if (
      await Chat.findOne({
        where: [
          {
            senderId: sender.id,
            recieverId: reciever.id,
          },
          {
            recieverId: sender.id,
            senderId: reciever.id,
          },
        ],
      })
    ) {
      return {
        error: {
          field: "reciever_uid",
          message: "chat.create_chat.errors.chat_already_exists",
        },
      };
    }

    let chat: Chat;
    try {
      chat = Chat.create({
        senderId: sender.id,
        recieverId: reciever.id,
      });

      await Chat.insert(chat);
    } catch (error) {
      console.log(error);
      return {
        error: {
          field: "_",
          message: "errors.500",
        },
      };
    }

    return {
      chat,
    };
  }

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
        pubsub.publish(UPDATE_MY_USER_KEY, {
          onUserUpdate: user,
        } as onUserUpdatePayload);
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
}
