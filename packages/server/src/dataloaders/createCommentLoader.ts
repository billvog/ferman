import Dataloader from "dataloader";
import { Comment } from "../entity/Comment";

export const createCommentLoader = () =>
  new Dataloader<string, Comment>(async (commentIds) => {
    const comments = await Comment.findByIds(commentIds as string[]);
    const commentIdToComment: Record<string, Comment> = {};
    comments.forEach((c) => {
      commentIdToComment[c.id] = c;
    });

    return commentIds.map((commentId) => commentIdToComment[commentId]);
  });
