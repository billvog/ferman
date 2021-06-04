import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.req.session.userId;

  if (!userId || !(await User.findOne(userId))) {
    throw new Error("Not authenticated");
  }

  return next();
};

export const isNotAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.req.session.userId;

  if (userId && (await User.findOne(userId))) {
    throw new Error("You're authenticated");
  }

  return next();
};
