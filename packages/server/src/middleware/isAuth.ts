import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { UpdateUserStatus } from "../utils/updateUserStatus";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const userId = context.req.session.userId;
  const foundUser = await User.findOne(userId);

  if (!userId || !foundUser) {
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
