import { Message } from "../entity/Message";
import { User } from "../entity/User";
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
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types/MyContext";
import { chatAuth } from "../middleware/chatAuth";
import { getConnection } from "typeorm";
import { MessageResponse } from "./Chat";
import { pubsub } from "../MyPubsub";
import { UPDATE_CHAT_MESSAGE_KEY } from "../constants";

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

@Resolver(() => Message)
export class MessageResolver {
  // USER
  @FieldResolver(() => User)
  user(@Root() message: Message, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(message.userId);
  }

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
      .orderBy('m."createdAt"', "ASC")
      .where("m.chatId = :chatId", {
        chatId,
      })
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.offset(skip);
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

  @UseMiddleware(chatAuth)
  @Mutation(() => MessageResponse)
  async markMessageRead(
    @Arg("chatId", () => String) chatId: string,
    @Arg("messageId", () => Int) messageId: number,
    @Ctx() { req }: MyContext
  ): Promise<MessageResponse> {
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
      newMessage: message,
    });

    return {
      message,
      error: false,
    };
  }
}
