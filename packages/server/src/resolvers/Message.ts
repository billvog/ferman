import { Message } from "../entity/Message";
import { User } from "../entity/User";
import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { MyContext } from "src/types/MyContext";

@Resolver(() => Message)
export class MessageResolver {
  // USER
  @FieldResolver(() => User)
  user(@Root() message: Message, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(message.userId);
  }
}
