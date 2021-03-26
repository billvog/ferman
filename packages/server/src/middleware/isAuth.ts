import { User } from "../entity/User";
import { MyContext } from "../MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }

  if (!(await User.findOne(context.req.session.userId))) {
    throw new Error("Not authenticated");
  }

  return next();
};

export const isNotAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (
    context.req.session.userId &&
    (await User.findOne(context.req.session.userId))
  ) {
    throw new Error("You're authenticated");
  }

  return next();
};
