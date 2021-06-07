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
import { getConnection } from "typeorm";
import { UPDATE_CHAT_MESSAGE_KEY, UPDATE_MY_USER_KEY } from "../constants";
import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { chatAuth } from "../middleware/chatAuth";
import { pubsub } from "../MyPubsub";
import { MyContext } from "../types/MyContext";
import { MinimalMessageResponse, NewMessagePayload } from "./Chat";
import { onUserUpdatePayload } from "./User";

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
      onNewMessage: message,
    } as NewMessagePayload);

    (async () => {
      const user = await User.findOne(req.session.userId);
      pubsub.publish(UPDATE_MY_USER_KEY, {
        onUserUpdate: user,
      } as onUserUpdatePayload);
    })();

    return {
      message,
      error: false,
    };
  }
}
