import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createPostLoader } from "../dataloaders/createPostLoader";
import { createLikeLoader } from "../dataloaders/createLikeLoader";
import { createUserLoader } from "../dataloaders/createUserLoader";
import { ExpressContext } from "apollo-server-express";

export type MyContext = ExpressContext & {
  req: Request & {
    session: {
      userId: number;
    };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  postLoader: ReturnType<typeof createPostLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
};
