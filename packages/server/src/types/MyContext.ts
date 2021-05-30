import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createCommentLoader } from "src/dataloaders/createCommentLoader";
import { createPostLoader } from "../dataloaders/createPostLoader";
import { createLikeLoader } from "../dataloaders/createLikeLoader";
import { createUserLoader } from "../dataloaders/createUserLoader";
import { createMessageLoader } from "src/dataloaders/createMessageLoader";
import { PubSub } from "graphql-subscriptions";

export type MyContext = {
  req: Request & {
    session: {
      userId: number;
    };
  };
  res: Response;
  redis: Redis;
  pubsub: PubSub;
  userLoader: ReturnType<typeof createUserLoader>;
  postLoader: ReturnType<typeof createPostLoader>;
  commentLoader: ReturnType<typeof createCommentLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
  messageLoader: ReturnType<typeof createMessageLoader>;
};
