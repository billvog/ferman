import { Expo, ExpoPushMessage } from "expo-server-sdk";
import { CronJob } from "cron";
import { User } from "../entity/User";

type Notif = {
  type: "message";
  idToSendTo: number;
  otherId: number;
  text: string;
};

let messages: Notif[] = [];

const messagesToExpoMessages = async (
  notifs: Notif[]
): Promise<ExpoPushMessage[]> => {
  const userIds = new Set();
  notifs.forEach((x) => {
    userIds.add(x.idToSendTo);
    userIds.add(x.otherId);
  });

  const users = await User.findByIds([...userIds]);
  const userMap: Record<string, User> = {};
  users.forEach((u) => {
    userMap[u.id] = u;
  });

  const formattedNotifs: ExpoPushMessage[] = [];

  notifs.forEach((n) => {
    const userToSendTo = userMap[n.idToSendTo];
    const otherUser = userMap[n.otherId];

    if (!userToSendTo || !otherUser || !userToSendTo.pushToken) {
      return;
    }

    formattedNotifs.push({
      to: userToSendTo.pushToken,
      title: `New message from ${otherUser.username?.slice(0, 20)}`,
      body: n.text,
    });
  });

  return formattedNotifs;
};

export const startPushNotificationRunner = () => {
  const expo = new Expo();

  // every minute
  new CronJob(
    "0 * * * * *",
    async () => {
      if (!messages.length) {
        return;
      }
      const tmpMessages = [...messages];
      messages = [];
      const chunks = expo.chunkPushNotifications(
        await messagesToExpoMessages(tmpMessages)
      );
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          ticketChunk.forEach((x) => {
            if (x.status === "error") {
              console.error(x);
            }
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    null,
    true,
    "America/Chicago"
  );
};

export const queuePushNotifToSend = (m: Notif) => {
  messages.push(m);
};
