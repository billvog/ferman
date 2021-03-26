export type StdParamList = {
  User: {
    userId: number;
  };
  Followers: {
    userId: number;
  };
  Following: {
    userId: number;
  };
  Post: {
    postId: string;
  };
  CreatePost: undefined;
  Comment: {
    commentId: number;
  };
  CreateComment: {
    postId: string;
    reply: boolean;
    parentId?: number;
  };
};
