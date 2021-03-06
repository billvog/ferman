import { pubsub } from "../MyPubsub";
import { User } from "../entity/User";
import { UPDATE_USER_STATUS_KEY } from "../constants";
import { onUserStatusUpdatePayload } from "../resolvers/User";

export const UpdateUserStatus = async (id: number, isOnline: boolean) => {
  const user = await User.findOne(id);
  if (!user) return;
  user.isOnline = isOnline;
  user.lastSeen = new Date();
  await user.save();

  pubsub.publish(UPDATE_USER_STATUS_KEY, {
    onUserStatusUpdate: user,
  } as onUserStatusUpdatePayload);
};
