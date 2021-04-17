import "reflect-metadata";
require("dotenv-safe").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { createConnection } from "typeorm";
import { MyContext } from "./MyContext";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { SESSION_COOKIE_NAME, __prod__ } from "./constants";
import { PostResolver } from "./resolvers/Post";
import cors from "cors";
import { ProfileResolver } from "./resolvers/Profile";
import { createUserLoader } from "./utils/createUserLoader";
import { createLikeLoader } from "./utils/createLikeLoader";
import { PostCommentResolver } from "./resolvers/PostComments";
import path from "path";
import { Profile } from "./entity/Profile";
import { User } from "./entity/User";
import { Follow } from "./entity/Follow";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
import { Like } from "./entity/Like";
import { sendEmail } from "./utils/sendEmail";

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
      likeLoader: createLikeLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // start server
  app.listen(process.env.PORT, () => {
    console.log("Listening at:", process.env.PORT);
  });
})();
