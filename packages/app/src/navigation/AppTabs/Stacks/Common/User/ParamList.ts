export type UserParamList = {
  EditProfile: undefined;
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
