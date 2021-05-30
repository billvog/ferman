import DataLoader from "dataloader";
import { In } from "typeorm";
import { Message } from "../entity/Message";

export const createMessageLoader = () =>
  new DataLoader<number, Message[]>(async (chatIds) => {
    const messages = await Message.find({
      where: {
        chatId: In(chatIds as number[]),
      },
    });
    const chatIdToMessages: Record<number, Message[]> = {};
    messages.forEach((m) => {
      chatIdToMessages[m.chatId].push(m);
    });

    return chatIds.map((chatId) => chatIdToMessages[chatId]);
  });
