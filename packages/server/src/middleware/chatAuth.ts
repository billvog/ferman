import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import { Chat } from "../entity/Chat";

export const chatAuth: MiddlewareFn<MyContext> = async (
  { context, root, args },
  next
) => {
  const chat = await Chat.findOne(args.chatId || root.id);

  if (!chat) {
    throw new Error("Chat not found");
  }

  const userId = (
    context.connection?.context.req.session || context.req.session
  ).userId;

  if (userId && (chat.senderId === userId || chat.recieverId === userId)) {
    return next();
  }

  throw new Error("403");
};
