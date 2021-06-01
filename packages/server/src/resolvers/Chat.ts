import { Chat } from "../entity/Chat";
import {
  Arg,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware,
  Int,
  Ctx,
  Field,
  FieldResolver,
  Root,
  Query,
  InputType,
  Subscription,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import { NEW_CHAT_MESSAGE_KEY } from "../constants";
import { PubSub, withFilter } from "graphql-subscriptions";
import { chatAuth } from "../middleware/chatAuth";
import { FieldError } from "./FieldError";
import { Follow } from "../entity/Follow";

const pubsub = new PubSub();

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
export class MessageResponse {
  @Field(() => Message, { nullable: true })
  message?: Message;
  @Field(() => Boolean)
  error: boolean;
}

@InputType()
export class MessageInput {
  @Field()
  text: string;
}

type NewMessagePayload = {
  chatId: number;
  newMessage: Message;
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

  @UseMiddleware(chatAuth)
  @Subscription(() => Message, {
    nullable: true,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_CHAT_MESSAGE_KEY),
      (payload, args) => payload.chatId === args.chatId
    ),
  })
  async newMessage(
    @Root() payload: NewMessagePayload,
    @Arg("chatId", () => String) chatId: string
  ): Promise<Message | null> {
    return payload.newMessage;
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
        newMessage: message,
      });
    } catch (error) {
      console.log(error);
      return {
        error: true,
      };
    }

    return {
      message,
      error: false,
    };
  }
}
