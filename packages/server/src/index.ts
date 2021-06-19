import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import http from "http";
import Redis from "ioredis";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { SESSION_COOKIE_NAME, __prod__ } from "./constants";
import { createLikeLoader } from "./dataloaders/createLikeLoader";
import { createPostLoader } from "./dataloaders/createPostLoader";
import { createUserLoader } from "./dataloaders/createUserLoader";
import { Chat } from "./entity/Chat";
import { Follow } from "./entity/Follow";
import { Like } from "./entity/Like";
import { Message } from "./entity/Message";
import { Post } from "./entity/Post";
import { Profile } from "./entity/Profile";
import { User } from "./entity/User";
import { MySchema } from "./MySchema";
import { MyContext } from "./types/MyContext";
import { startPushNotificationRunner } from "./utils/pushNotifications";
import { UpdateUserStatus } from "./utils/updateUserStatus";
require("dotenv-safe").config();

(async () => {
  // setup redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  const app = express();
  const httpServer = http.createServer(app);

  // express middleware
  const sessionMiddleware = session({
    name: SESSION_COOKIE_NAME,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1 year
      httpOnly: true,
      sameSite: "lax",
      secure: __prod__,
      domain: __prod__ ? ".ferman.ga" : undefined,
    },
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
  });

  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(sessionMiddleware);

  // create db connection
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: !__prod__,
    migrations: [path.join(__dirname, "./migration/*")],
    entities: [User, Profile, Follow, Post, Like, Message, Chat],
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

  // setup push notications
  startPushNotificationRunner();

  // setup apollo
  const apolloServer = new ApolloServer({
    schema: await MySchema(),
    subscriptions: {
      onConnect: (_, ws: any) => {
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, async () => {
            res({ req: ws.upgradeReq });
            UpdateUserStatus(ws.upgradeReq.session.userId, true);
          })
        );
      },
      onDisconnect: (ws: any) => {
        sessionMiddleware(ws.upgradeReq, {} as any, async () => {
          UpdateUserStatus(ws.upgradeReq.session.userId, false);
        });
      },
    },
    context: ({ req, res, connection }: MyContext) =>
      ({
        req: req || connection?.context.req,
        res,
        redis,
        connection,
        userLoader: createUserLoader(),
        postLoader: createPostLoader(),
        likeLoader: createLikeLoader(),
      } as MyContext),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  apolloServer.installSubscriptionHandlers(httpServer);

  // start server
  httpServer.listen(process.env.PORT, async () => {
    console.log("🚀 Server started @", process.env.PORT);
  });
})();
