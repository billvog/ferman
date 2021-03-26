import DataLoader from "dataloader";
import { Like } from "../entity/Like";

export const createLikeLoader = () =>
  new DataLoader<{ postId: string; userId: number }, Like | null>(
    async (keys) => {
      const likes = await Like.findByIds(keys as any);
      const likeIdsToLike: Record<string, Like> = {};
      likes.forEach((like) => {
        likeIdsToLike[`${like.userId}|${like.postId}`] = like;
      });

      return keys.map((key) => likeIdsToLike[`${key.userId}|${key.postId}`]);
    }
  );
