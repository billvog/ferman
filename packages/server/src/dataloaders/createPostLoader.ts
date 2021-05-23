import Dataloader from "dataloader";
import { Post } from "../entity/Post";

export const createPostLoader = () =>
  new Dataloader<string, Post>(async (postIds) => {
    const posts = await Post.findByIds(postIds as string[]);
    const postIdToPost: Record<string, Post> = {};
    posts.forEach((p) => {
      postIdToPost[p.id] = p;
    });

    return postIds.map((postId) => postIdToPost[postId]);
  });
