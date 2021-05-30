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
  Args,
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import { NEW_MESSAGE_KEY } from "../constants";
import { PubSub, withFilter } from "graphql-subscriptions";

const pubsub = new PubSub();

@ObjectType()
export class ChatResponse {
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
  newChatMessage: Message;
};

@Resolver(() => Chat)
export class ChatResolver {
  // MESSAGES
  @FieldResolver(() => [Message])
  messages(@Root() chat: Chat, @Ctx() { req }: MyContext) {
    if (
      chat.senderId !== req.session.userId &&
      chat.recieverId !== req.session.userId
    ) {
      return [];
    }

    return Message.find({
      where: {
        chatId: chat.id,
      },
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => ChatResponse)
  async chat(
    @Arg("recieverId", () => Int) recieverId: number,
    @Ctx() { req }: MyContext
  ): Promise<ChatResponse> {
    const chat = await Chat.findOne({
      where: {
        senderId: req.session.userId,
        recieverId,
      },
    });

    if (!chat) {
      return { error: true };
    }

    return { chat, error: false };
  }

  @Subscription(() => Message, {
    nullable: true,
    subscribe: withFilter(
      () => pubsub.asyncIterator(NEW_MESSAGE_KEY),
      (payload, args) => payload.chatId === args.chatId
    ),
  })
  async newChatMessage(
    @Root() payload: NewMessagePayload,
    @Arg("chatId", () => Int) chatId: number,
    @Ctx() { connection }: MyContext
  ): Promise<Message | null> {
    const chat = await Chat.findOne({
      where: [
        {
          id: chatId,
          senderId: connection?.context.req.session.userId,
        },
        {
          id: chatId,
          recieverId: connection?.context.req.session.userId,
        },
      ],
    });

    if (!chat) {
      throw new Error("403");
    }

    return payload.newChatMessage;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => ChatResponse)
  async createChat(
    @Arg("recieverId", () => Int) recieverId: number,
    @Ctx() { req }: MyContext
  ): Promise<ChatResponse> {
    const sender = await User.findOne(req.session.userId);
    const reciever = await User.findOne(recieverId);

    if (!sender || !reciever) {
      return {
        error: true,
      };
    }

    const chat = await Chat.insert({
      senderId: sender.id,
      recieverId: reciever.id,
    });

    return {
      error: false,
      chat: chat.generatedMaps[0] as any,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => MessageResponse)
  async sendMessage(
    @Arg("chatId", () => Int) chatId: number,
    @Arg("options", () => MessageInput) options: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<MessageResponse> {
    const chat = await Chat.findOne({
      where: [
        {
          id: chatId,
          senderId: req.session.userId,
        },
        {
          id: chatId,
          recieverId: req.session.userId,
        },
      ],
    });

    if (!chat) {
      return {
        error: true,
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

      pubsub.publish(NEW_MESSAGE_KEY, {
        chatId,
        newChatMessage: message,
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
