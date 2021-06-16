export type UserParamList = {
  EditProfile: {
    submitForm?: (() => Promise<void>) & (() => Promise<any>);
  };
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
