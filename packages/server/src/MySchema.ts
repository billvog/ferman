import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/Chat";
import { MessageResolver } from "./resolvers/Message";
import { PostResolver } from "./resolvers/Post";
import { PostCommentResolver } from "./resolvers/PostComments";
import { ProfileResolver } from "./resolvers/Profile";
import { UserResolver } from "./resolvers/User";

export const MySchema = async () =>
  await buildSchema({
    resolvers: [
      UserResolver,
      ProfileResolver,
      PostResolver,
      PostCommentResolver,
      ChatResolver,
      MessageResolver,
    ],
    validate: false,
  });
