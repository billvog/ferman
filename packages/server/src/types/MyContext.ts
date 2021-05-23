import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createPostLoader } from "src/dataloaders/createPostLoader";
import { createLikeLoader } from "../dataloaders/createLikeLoader";
import { createUserLoader } from "../dataloaders/createUserLoader";

export type MyContext = {
  req: Request & {
    session: {
      userId: number;
    };
  };
  res: Response;
  redis: Redis;
  postLoader: ReturnType<typeof createPostLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
  likeLoader: ReturnType<typeof createLikeLoader>;
};
