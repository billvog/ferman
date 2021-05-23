import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { SESSION_COOKIE_NAME, __prod__ } from "./constants";
import { createCommentLoader } from "./dataloaders/createCommentLoader";
import { createLikeLoader } from "./dataloaders/createLikeLoader";
import { createPostLoader } from "./dataloaders/createPostLoader";
import { createUserLoader } from "./dataloaders/createUserLoader";
import { Comment } from "./entity/Comment";
import { Follow } from "./entity/Follow";
import { Like } from "./entity/Like";
import { Post } from "./entity/Post";
import { Profile } from "./entity/Profile";
import { User } from "./entity/User";
import { PostResolver } from "./resolvers/Post";
import { PostCommentResolver } from "./resolvers/PostComments";
import { ProfileResolver } from "./resolvers/Profile";
import { UserResolver } from "./resolvers/User";
import { MyContext } from "./types/MyContext";
require("dotenv-safe").config();

(async () => {
  // setup redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  const app = express();
  app.set("trust proxy", 1);

  // express middleware
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: SESSION_COOKIE_NAME,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 year
        httpOnly: true,
        sameSite: "lax",
        // secure: __prod__,
        secure: false,
        domain: __prod__ ? ".ferman.ga" : undefined,
      },
      store: new RedisStore({ client: redis }),
      secret: process.env.SESSION_SECRET as string,
      saveUninitialized: false,
      resave: false,
    })
  );

  // create db connection
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    logger: "simple-console",
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User, Profile, Follow, Post, Like, Comment],
    ssl: __prod__,
    extra: __prod__
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : undefined,
  });

  // update database on prod
  if (__prod__) {
    await conn.runMigrations();
  }

  // setup apollo
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        ProfileResolver,
        PostResolver,
        PostCommentResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      postLoader: createPostLoader(),
      commentLoader: createCommentLoader(),
      likeLoader: createLikeLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // start server
  app.listen(process.env.PORT, () => {
    console.log("Listening at:", process.env.PORT);
  });
})();
