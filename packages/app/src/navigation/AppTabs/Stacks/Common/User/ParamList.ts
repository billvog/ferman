export type UserParamList = {
  UserProfile: {
    userId?: number;
    userUid?: string;
  };
  UserFollowers: {
    userId: number;
  };
  UserFollowings: {
    userId: number;
  };
};
