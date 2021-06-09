import { withFilter } from "graphql-subscriptions";
import { MyContext } from "src/types/MyContext";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { getConnection, Not } from "typeorm";
import {
  DELETE_CHAT_MESSAGE_KEY,
  NEW_CHAT_MESSAGE_KEY,
  UPDATE_CHAT_MESSAGE_KEY,
} from "../constants";
import { Chat } from "../entity/Chat";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { chatAuth } from "../middleware/chatAuth";
import { isAuth } from "../middleware/isAuth";
import { pubsub } from "../MyPubsub";
import { FieldError } from "./FieldError";

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

export type OnMessageUpdatedPayload = {
  chatId: string;
  onMessageUpdated: Message;
};

export type OnMessageDeletedPayload = {
  chatId: string;
  onMessageDeleted: number;
};

const ChatFilterFn = async (payload: any, args: any, context: MyContext) => {
  if (payload?.chatId === args?.chatId) {
    const chatFromArgs = await Chat.findOne(args.chatId);
    if (
      chatFromArgs &&
      (chatFromArgs.senderId ===
        context.connection?.context.req.session.userId ||
        chatFromArgs.recieverId ===
          context.connection?.context.req.session.userId)
    )
      return true;
  } else {
    const chatFromPayload = await Chat.findOne(payload.chatId);
    if (
      chatFromPayload &&
      (chatFromPayload.senderId ===
        context.connection?.context.req.session.userId ||
        chatFromPayload.recieverId ===
          context.connection?.context.req.session.userId)
    )
      return true;
  }

  return false;
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

  // HAS UNREAD MESSAGE
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

  // ON NEW MESSAGE
  @Subscription(() => Message, {
    nullable: true,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_CHAT_MESSAGE_KEY),
      ChatFilterFn
    ),
  })
  onNewMessage(
    @Root() payload: NewMessagePayload,
    @Arg("chatId", () => String, { nullable: true }) _: string
  ): Message | null {
    return payload.onNewMessage;
  }

  // MESSAGES UPDATED
  @UseMiddleware(chatAuth)
  @Subscription(() => Message, {
    nullable: true,
    subscribe: withFilter(
      () => pubsub.asyncIterator(UPDATE_CHAT_MESSAGE_KEY),
      ChatFilterFn
    ),
  })
  onMessageUpdated(
    @Root() payload: OnMessageUpdatedPayload,
    @Arg("chatId", () => String) _: string
  ): Message | null {
    return payload.onMessageUpdated;
  }

  // MESSAGES DELETED
  @UseMiddleware(chatAuth)
  @Subscription(() => Int, {
    nullable: true,
    subscribe: withFilter(
      () => pubsub.asyncIterator(DELETE_CHAT_MESSAGE_KEY),
      ChatFilterFn
    ),
  })
  onMessageDeleted(
    @Root() payload: OnMessageDeletedPayload,
    @Arg("chatId", () => String) _: string
  ): number | null {
    return payload.onMessageDeleted;
  }

  // GET CHAT BY ID
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

  // GET ALL CHATS
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

  // CREATE CHAT
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
}
