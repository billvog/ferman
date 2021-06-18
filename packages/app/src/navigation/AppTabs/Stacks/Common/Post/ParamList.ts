export type PostParamList = {
  SearchPosts: {
    query: string;
  };
  ViewPost: {
    postId: string;
  };
  ReplyPost: {
    parentPostId: string;
  };
};
