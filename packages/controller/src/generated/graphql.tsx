import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['String'];
  senderId: Scalars['Int'];
  sender: User;
  recieverId: Scalars['Int'];
  reciever: User;
  latestMessage?: Maybe<Message>;
  hasUnreadMessage: Scalars['Boolean'];
  createdAt: Scalars['String'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat?: Maybe<Chat>;
  error?: Maybe<FieldError>;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Float'];
  chatId: Scalars['String'];
  userId: Scalars['Float'];
  text: Scalars['String'];
  read: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  user: User;
};

export type MessageInput = {
  text: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message?: Maybe<Message>;
  error?: Maybe<FieldError>;
};

export type MinimalChatResponse = {
  __typename?: 'MinimalChatResponse';
  chat?: Maybe<Chat>;
  error: Scalars['Boolean'];
};

export type MinimalMessageIdResponse = {
  __typename?: 'MinimalMessageIdResponse';
  messageId?: Maybe<Scalars['Int']>;
  error: Scalars['Boolean'];
};

export type MinimalMessageResponse = {
  __typename?: 'MinimalMessageResponse';
  message?: Maybe<Message>;
  error: Scalars['Boolean'];
};

export type MinimalPostIdResponse = {
  __typename?: 'MinimalPostIdResponse';
  postId?: Maybe<Scalars['String']>;
  parentPostId?: Maybe<Scalars['String']>;
  error: Scalars['Boolean'];
};

export type MinimalPostResponse = {
  __typename?: 'MinimalPostResponse';
  error?: Maybe<Scalars['Boolean']>;
  post?: Maybe<Post>;
};

export type MinimalUsersResponse = {
  __typename?: 'MinimalUsersResponse';
  error?: Maybe<Scalars['Boolean']>;
  users?: Maybe<Array<User>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatResponse;
  sendMessage: MessageResponse;
  deleteMessage: MinimalMessageIdResponse;
  markMessageRead: MinimalMessageResponse;
  likePost: MinimalPostResponse;
  createPost: PostResponse;
  deletePost: MinimalPostIdResponse;
  updateProfile: ProfileResponse;
  follow: MinimalUsersResponse;
  logout: Scalars['Boolean'];
  login: UserErrorResponse;
  register?: Maybe<FieldError>;
  validateRegisterToken: Scalars['Boolean'];
  finishRegister: UserErrorResponse;
  forgotPassword?: Maybe<FieldError>;
  resetPassword?: Maybe<FieldError>;
  accountDeletionRequest: Scalars['Boolean'];
  validateAccountDeletionToken: Scalars['Boolean'];
  validateAccountDeletionTokenWithPassword: Scalars['Boolean'];
  finishAccountDeletion?: Maybe<FieldError>;
};


export type MutationCreateChatArgs = {
  reciever_uid: Scalars['String'];
};


export type MutationSendMessageArgs = {
  options: MessageInput;
  chatId: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['Int'];
  chatId: Scalars['String'];
};


export type MutationMarkMessageReadArgs = {
  messageId: Scalars['Int'];
  chatId: Scalars['String'];
};


export type MutationLikePostArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
  parentPostId?: Maybe<Scalars['String']>;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  options: ProfileInput;
};


export type MutationFollowArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationValidateRegisterTokenArgs = {
  token: Scalars['String'];
};


export type MutationFinishRegisterArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
  options: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};


export type MutationValidateAccountDeletionTokenArgs = {
  token: Scalars['String'];
};


export type MutationValidateAccountDeletionTokenWithPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationFinishAccountDeletionArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type PaginatedChats = {
  __typename?: 'PaginatedChats';
  chats: Array<Chat>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
  executionTime: Scalars['Float'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<Message>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
  executionTime: Scalars['Float'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  parent?: Maybe<Post>;
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
  executionTime: Scalars['Float'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  users: Array<User>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
  executionTime: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  body: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  createdAt: Scalars['String'];
  parentPostId?: Maybe<Scalars['String']>;
  parentPost?: Maybe<Post>;
  points: Scalars['Float'];
  repliesCount: Scalars['Float'];
  likeStatus?: Maybe<Scalars['Boolean']>;
};

export type PostInput = {
  body: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  error?: Maybe<FieldError>;
  post?: Maybe<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  userId: Scalars['Float'];
  avatarUrl: Scalars['String'];
  bannerUrl: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  birthdate: Scalars['String'];
  showBirthdate: Scalars['Boolean'];
  postsCount: Scalars['Int'];
  repliesCount: Scalars['Int'];
  likesCount: Scalars['Int'];
};

export type ProfileInput = {
  username: Scalars['String'];
  bio: Scalars['String'];
  location: Scalars['String'];
  showBirthdate: Scalars['Boolean'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  chat: MinimalChatResponse;
  chats: PaginatedChats;
  messages: PaginatedMessages;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  followers?: Maybe<PaginatedUsers>;
  followings?: Maybe<PaginatedUsers>;
  user?: Maybe<User>;
  users: PaginatedUsers;
  me?: Maybe<User>;
};


export type QueryChatArgs = {
  chatId: Scalars['String'];
};


export type QueryChatsArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryMessagesArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  chatId: Scalars['String'];
};


export type QueryPostsArgs = {
  likedBy?: Maybe<Scalars['Int']>;
  fromFollowed?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['String']>;
  isReply?: Maybe<Scalars['Boolean']>;
  parentPostId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryFollowersArgs = {
  userId: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryFollowingsArgs = {
  userId: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryUserArgs = {
  uid?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  notMe?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  uid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  birthdate: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onNewMessage?: Maybe<Message>;
  onMessageUpdated?: Maybe<Message>;
  onMessageDeleted?: Maybe<Scalars['Int']>;
  onMyUserUpdate?: Maybe<User>;
  onUserStatusUpdate?: Maybe<UserStatus>;
};


export type SubscriptionOnNewMessageArgs = {
  chatId: Scalars['String'];
};


export type SubscriptionOnMessageUpdatedArgs = {
  chatId: Scalars['String'];
};


export type SubscriptionOnMessageDeletedArgs = {
  chatId: Scalars['String'];
};


export type SubscriptionOnUserStatusUpdateArgs = {
  id?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  uid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  isOnline: Scalars['Boolean'];
  lastSeen: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  hasUnreadMessage: Scalars['Boolean'];
  followsYouStatus?: Maybe<Scalars['Boolean']>;
  followingStatus?: Maybe<Scalars['Boolean']>;
  followersCount: Scalars['Float'];
  followingsCount: Scalars['Float'];
  profile?: Maybe<Profile>;
};

export type UserErrorResponse = {
  __typename?: 'UserErrorResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type UserStatus = {
  __typename?: 'userStatus';
  id: Scalars['Float'];
  isOnline: Scalars['Boolean'];
  lastSeen: Scalars['DateTime'];
};

export type BasicProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'avatarUrl' | 'postsCount' | 'repliesCount' | 'likesCount'>
);

export type BasicUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'uid' | 'username' | 'isOnline' | 'lastSeen'>
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & BasicProfileFragment
  )> }
);

export type ChatResponseFragment = (
  { __typename?: 'ChatResponse' }
  & { chat?: Maybe<(
    { __typename?: 'Chat' }
    & FullChatFragment
  )>, error?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type FieldErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type FullChatFragment = (
  { __typename?: 'Chat' }
  & Pick<Chat, 'id' | 'senderId' | 'recieverId' | 'hasUnreadMessage' | 'createdAt'>
  & { sender: (
    { __typename?: 'User' }
    & BasicUserFragment
  ), reciever: (
    { __typename?: 'User' }
    & BasicUserFragment
  ), latestMessage?: Maybe<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )> }
);

export type FullMessageFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'chatId' | 'userId' | 'text' | 'read' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & BasicUserFragment
  ) }
);

export type FullPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'body' | 'points' | 'repliesCount' | 'likeStatus' | 'createdAt' | 'parentPostId'>
  & { parentPost?: Maybe<(
    { __typename?: 'Post' }
    & FullPostWithoutParentFragment
  )>, creator: (
    { __typename?: 'User' }
    & BasicUserFragment
  ) }
);

export type FullPostWithoutParentFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'body' | 'points' | 'repliesCount' | 'likeStatus' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & BasicUserFragment
  ) }
);

export type FullProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'avatarUrl' | 'bannerUrl' | 'bio' | 'location' | 'birthdate' | 'showBirthdate' | 'postsCount' | 'repliesCount' | 'likesCount'>
);

export type FullUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'uid' | 'username' | 'email' | 'createdAt' | 'isOnline' | 'lastSeen' | 'hasUnreadMessage' | 'followsYouStatus' | 'followingStatus' | 'followersCount' | 'followingsCount'>
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & FullProfileFragment
  )> }
);

export type MessageResponseFragment = (
  { __typename?: 'MessageResponse' }
  & { message?: Maybe<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )>, error?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type MinimalChatResponseFragment = (
  { __typename?: 'MinimalChatResponse' }
  & Pick<MinimalChatResponse, 'error'>
  & { chat?: Maybe<(
    { __typename?: 'Chat' }
    & FullChatFragment
  )> }
);

export type MinimalMessageIdResponseFragment = (
  { __typename?: 'MinimalMessageIdResponse' }
  & Pick<MinimalMessageIdResponse, 'messageId' | 'error'>
);

export type MinimalMessageResponseFragment = (
  { __typename?: 'MinimalMessageResponse' }
  & Pick<MinimalMessageResponse, 'error'>
  & { message?: Maybe<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )> }
);

export type MinimalPostIdResponseFragment = (
  { __typename?: 'MinimalPostIdResponse' }
  & Pick<MinimalPostIdResponse, 'postId' | 'parentPostId' | 'error'>
);

export type PaginatedChatsFragment = (
  { __typename?: 'PaginatedChats' }
  & Pick<PaginatedChats, 'hasMore' | 'executionTime' | 'count'>
  & { chats: Array<(
    { __typename?: 'Chat' }
    & FullChatFragment
  )> }
);

export type PaginatedMessagesFragment = (
  { __typename?: 'PaginatedMessages' }
  & Pick<PaginatedMessages, 'hasMore' | 'executionTime' | 'count'>
  & { messages: Array<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )> }
);

export type PaginatedPostsFragment = (
  { __typename?: 'PaginatedPosts' }
  & Pick<PaginatedPosts, 'hasMore' | 'executionTime' | 'count'>
  & { parent?: Maybe<(
    { __typename?: 'Post' }
    & FullPostFragment
  )>, posts: Array<(
    { __typename?: 'Post' }
    & FullPostFragment
  )> }
);

export type PaginatedUsersFragment = (
  { __typename?: 'PaginatedUsers' }
  & Pick<PaginatedUsers, 'hasMore' | 'executionTime' | 'count'>
  & { users: Array<(
    { __typename?: 'User' }
    & FullUserFragment
  )> }
);

export type CreateChatMutationVariables = Exact<{
  reciever_uid: Scalars['String'];
}>;


export type CreateChatMutation = (
  { __typename?: 'Mutation' }
  & { createChat: (
    { __typename?: 'ChatResponse' }
    & ChatResponseFragment
  ) }
);

export type DeleteMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  messageId: Scalars['Int'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage: (
    { __typename?: 'MinimalMessageIdResponse' }
    & MinimalMessageIdResponseFragment
  ) }
);

export type MarkMessageReadMutationVariables = Exact<{
  chatId: Scalars['String'];
  messageId: Scalars['Int'];
}>;


export type MarkMessageReadMutation = (
  { __typename?: 'Mutation' }
  & { markMessageRead: (
    { __typename?: 'MinimalMessageResponse' }
    & MinimalMessageResponseFragment
  ) }
);

export type SendMessageMutationVariables = Exact<{
  chatId: Scalars['String'];
  options: MessageInput;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'MessageResponse' }
    & MessageResponseFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  parentPostId?: Maybe<Scalars['String']>;
  options: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>, post?: Maybe<(
      { __typename?: 'Post' }
      & FullPostFragment
    )> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & { deletePost: (
    { __typename?: 'MinimalPostIdResponse' }
    & MinimalPostIdResponseFragment
  ) }
);

export type LikePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'MinimalPostResponse' }
    & Pick<MinimalPostResponse, 'error'>
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & FullPostFragment
    )> }
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  options: ProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'ProfileResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserFragment
    )> }
  ) }
);

export type AccountDeletionRequestMutationVariables = Exact<{ [key: string]: never; }>;


export type AccountDeletionRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'accountDeletionRequest'>
);

export type FinishAccountDeletionMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type FinishAccountDeletionMutation = (
  { __typename?: 'Mutation' }
  & { finishAccountDeletion?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type ValidateAccountDeletionTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateAccountDeletionTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'validateAccountDeletionToken'>
);

export type ValidateAccountDeletionTokenWithPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ValidateAccountDeletionTokenWithPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'validateAccountDeletionTokenWithPassword'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type FinishRegisterMutationVariables = Exact<{
  token: Scalars['String'];
  options: RegisterInput;
  password: Scalars['String'];
}>;


export type FinishRegisterMutation = (
  { __typename?: 'Mutation' }
  & { finishRegister: (
    { __typename?: 'UserErrorResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserFragment
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'FieldError' }
    & FieldErrorFragment
  )> }
);

export type ValidateRegisterTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ValidateRegisterTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'validateRegisterToken'>
);

export type FollowMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type FollowMutation = (
  { __typename?: 'Mutation' }
  & { follow: (
    { __typename?: 'MinimalUsersResponse' }
    & Pick<MinimalUsersResponse, 'error'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & FullUserFragment
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  options: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserErrorResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & FullUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type ChatQueryVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type ChatQuery = (
  { __typename?: 'Query' }
  & { chat: (
    { __typename?: 'MinimalChatResponse' }
    & MinimalChatResponseFragment
  ) }
);

export type ChatsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
}>;


export type ChatsQuery = (
  { __typename?: 'Query' }
  & { chats: (
    { __typename?: 'PaginatedChats' }
    & PaginatedChatsFragment
  ) }
);

export type MessagesQueryVariables = Exact<{
  chatId: Scalars['String'];
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'PaginatedMessages' }
    & PaginatedMessagesFragment
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & FullPostFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  parentPostId?: Maybe<Scalars['String']>;
  isReply?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  fromFollowed?: Maybe<Scalars['Boolean']>;
  likedBy?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & PaginatedPostsFragment
  ) }
);

export type FollowersQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
}>;


export type FollowersQuery = (
  { __typename?: 'Query' }
  & { followers?: Maybe<(
    { __typename?: 'PaginatedUsers' }
    & PaginatedUsersFragment
  )> }
);

export type FollowingsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
}>;


export type FollowingsQuery = (
  { __typename?: 'Query' }
  & { followings?: Maybe<(
    { __typename?: 'PaginatedUsers' }
    & PaginatedUsersFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & FullUserFragment
  )> }
);

export type UserQueryVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & FullUserFragment
  )> }
);

export type UsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  notMe?: Maybe<Scalars['Boolean']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'PaginatedUsers' }
    & PaginatedUsersFragment
  ) }
);

export type OnMessageDeletedSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type OnMessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'onMessageDeleted'>
);

export type OnMessageUpdatedSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type OnMessageUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { onMessageUpdated?: Maybe<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )> }
);

export type OnNewMessageSubscriptionVariables = Exact<{
  chatId: Scalars['String'];
}>;


export type OnNewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { onNewMessage?: Maybe<(
    { __typename?: 'Message' }
    & FullMessageFragment
  )> }
);

export type OnMyUserUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnMyUserUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { onMyUserUpdate?: Maybe<(
    { __typename?: 'User' }
    & FullUserFragment
  )> }
);

export type OnUserStatusUpdateSubscriptionVariables = Exact<{
  id?: Maybe<Scalars['Int']>;
}>;


export type OnUserStatusUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { onUserStatusUpdate?: Maybe<(
    { __typename?: 'userStatus' }
    & Pick<UserStatus, 'id' | 'isOnline' | 'lastSeen'>
  )> }
);

export const BasicProfileFragmentDoc = gql`
    fragment BasicProfile on Profile {
  avatarUrl
  postsCount
  repliesCount
  likesCount
}
    `;
export const BasicUserFragmentDoc = gql`
    fragment BasicUser on User {
  id
  uid
  username
  isOnline
  lastSeen
  profile {
    ...BasicProfile
  }
}
    ${BasicProfileFragmentDoc}`;
export const FullMessageFragmentDoc = gql`
    fragment FullMessage on Message {
  id
  chatId
  userId
  user {
    ...BasicUser
  }
  text
  read
  createdAt
}
    ${BasicUserFragmentDoc}`;
export const FullChatFragmentDoc = gql`
    fragment FullChat on Chat {
  id
  senderId
  sender {
    ...BasicUser
  }
  recieverId
  reciever {
    ...BasicUser
  }
  hasUnreadMessage
  latestMessage {
    ...FullMessage
  }
  createdAt
}
    ${BasicUserFragmentDoc}
${FullMessageFragmentDoc}`;
export const FieldErrorFragmentDoc = gql`
    fragment FieldError on FieldError {
  field
  message
}
    `;
export const ChatResponseFragmentDoc = gql`
    fragment ChatResponse on ChatResponse {
  chat {
    ...FullChat
  }
  error {
    ...FieldError
  }
}
    ${FullChatFragmentDoc}
${FieldErrorFragmentDoc}`;
export const MessageResponseFragmentDoc = gql`
    fragment MessageResponse on MessageResponse {
  message {
    ...FullMessage
  }
  error {
    ...FieldError
  }
}
    ${FullMessageFragmentDoc}
${FieldErrorFragmentDoc}`;
export const MinimalChatResponseFragmentDoc = gql`
    fragment MinimalChatResponse on MinimalChatResponse {
  chat {
    ...FullChat
  }
  error
}
    ${FullChatFragmentDoc}`;
export const MinimalMessageIdResponseFragmentDoc = gql`
    fragment MinimalMessageIdResponse on MinimalMessageIdResponse {
  messageId
  error
}
    `;
export const MinimalMessageResponseFragmentDoc = gql`
    fragment MinimalMessageResponse on MinimalMessageResponse {
  message {
    ...FullMessage
  }
  error
}
    ${FullMessageFragmentDoc}`;
export const MinimalPostIdResponseFragmentDoc = gql`
    fragment MinimalPostIdResponse on MinimalPostIdResponse {
  postId
  parentPostId
  error
}
    `;
export const PaginatedChatsFragmentDoc = gql`
    fragment PaginatedChats on PaginatedChats {
  hasMore
  executionTime
  count
  chats {
    ...FullChat
  }
}
    ${FullChatFragmentDoc}`;
export const PaginatedMessagesFragmentDoc = gql`
    fragment PaginatedMessages on PaginatedMessages {
  hasMore
  executionTime
  count
  messages {
    ...FullMessage
  }
}
    ${FullMessageFragmentDoc}`;
export const FullPostWithoutParentFragmentDoc = gql`
    fragment FullPostWithoutParent on Post {
  id
  body
  points
  repliesCount
  likeStatus
  createdAt
  creator {
    ...BasicUser
  }
}
    ${BasicUserFragmentDoc}`;
export const FullPostFragmentDoc = gql`
    fragment FullPost on Post {
  id
  body
  points
  repliesCount
  likeStatus
  createdAt
  parentPostId
  parentPost {
    ...FullPostWithoutParent
  }
  creator {
    ...BasicUser
  }
}
    ${FullPostWithoutParentFragmentDoc}
${BasicUserFragmentDoc}`;
export const PaginatedPostsFragmentDoc = gql`
    fragment PaginatedPosts on PaginatedPosts {
  hasMore
  executionTime
  count
  parent {
    ...FullPost
  }
  posts {
    ...FullPost
  }
}
    ${FullPostFragmentDoc}`;
export const FullProfileFragmentDoc = gql`
    fragment FullProfile on Profile {
  avatarUrl
  bannerUrl
  bio
  location
  birthdate
  showBirthdate
  postsCount
  repliesCount
  likesCount
}
    `;
export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  uid
  username
  email
  createdAt
  isOnline
  lastSeen
  hasUnreadMessage
  followsYouStatus
  followingStatus
  followersCount
  followingsCount
  profile {
    ...FullProfile
  }
}
    ${FullProfileFragmentDoc}`;
export const PaginatedUsersFragmentDoc = gql`
    fragment PaginatedUsers on PaginatedUsers {
  users {
    ...FullUser
  }
  hasMore
  executionTime
  count
}
    ${FullUserFragmentDoc}`;
export const CreateChatDocument = gql`
    mutation CreateChat($reciever_uid: String!) {
  createChat(reciever_uid: $reciever_uid) {
    ...ChatResponse
  }
}
    ${ChatResponseFragmentDoc}`;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      reciever_uid: // value for 'reciever_uid'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($chatId: String!, $messageId: Int!) {
  deleteMessage(chatId: $chatId, messageId: $messageId) {
    ...MinimalMessageIdResponse
  }
}
    ${MinimalMessageIdResponseFragmentDoc}`;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const MarkMessageReadDocument = gql`
    mutation MarkMessageRead($chatId: String!, $messageId: Int!) {
  markMessageRead(chatId: $chatId, messageId: $messageId) {
    ...MinimalMessageResponse
  }
}
    ${MinimalMessageResponseFragmentDoc}`;
export type MarkMessageReadMutationFn = Apollo.MutationFunction<MarkMessageReadMutation, MarkMessageReadMutationVariables>;

/**
 * __useMarkMessageReadMutation__
 *
 * To run a mutation, you first call `useMarkMessageReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkMessageReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markMessageReadMutation, { data, loading, error }] = useMarkMessageReadMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useMarkMessageReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkMessageReadMutation, MarkMessageReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkMessageReadMutation, MarkMessageReadMutationVariables>(MarkMessageReadDocument, options);
      }
export type MarkMessageReadMutationHookResult = ReturnType<typeof useMarkMessageReadMutation>;
export type MarkMessageReadMutationResult = Apollo.MutationResult<MarkMessageReadMutation>;
export type MarkMessageReadMutationOptions = Apollo.BaseMutationOptions<MarkMessageReadMutation, MarkMessageReadMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($chatId: String!, $options: MessageInput!) {
  sendMessage(chatId: $chatId, options: $options) {
    ...MessageResponse
  }
}
    ${MessageResponseFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($parentPostId: String, $options: PostInput!) {
  createPost(parentPostId: $parentPostId, options: $options) {
    error {
      ...FieldError
    }
    post {
      ...FullPost
    }
  }
}
    ${FieldErrorFragmentDoc}
${FullPostFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      parentPostId: // value for 'parentPostId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id) {
    ...MinimalPostIdResponse
  }
}
    ${MinimalPostIdResponseFragmentDoc}`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($id: String!) {
  likePost(id: $id) {
    error
    post {
      ...FullPost
    }
  }
}
    ${FullPostFragmentDoc}`;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($options: ProfileInput!) {
  updateProfile(options: $options) {
    error {
      ...FieldError
    }
    user {
      ...FullUser
    }
  }
}
    ${FieldErrorFragmentDoc}
${FullUserFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const AccountDeletionRequestDocument = gql`
    mutation AccountDeletionRequest {
  accountDeletionRequest
}
    `;
export type AccountDeletionRequestMutationFn = Apollo.MutationFunction<AccountDeletionRequestMutation, AccountDeletionRequestMutationVariables>;

/**
 * __useAccountDeletionRequestMutation__
 *
 * To run a mutation, you first call `useAccountDeletionRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccountDeletionRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accountDeletionRequestMutation, { data, loading, error }] = useAccountDeletionRequestMutation({
 *   variables: {
 *   },
 * });
 */
export function useAccountDeletionRequestMutation(baseOptions?: Apollo.MutationHookOptions<AccountDeletionRequestMutation, AccountDeletionRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccountDeletionRequestMutation, AccountDeletionRequestMutationVariables>(AccountDeletionRequestDocument, options);
      }
export type AccountDeletionRequestMutationHookResult = ReturnType<typeof useAccountDeletionRequestMutation>;
export type AccountDeletionRequestMutationResult = Apollo.MutationResult<AccountDeletionRequestMutation>;
export type AccountDeletionRequestMutationOptions = Apollo.BaseMutationOptions<AccountDeletionRequestMutation, AccountDeletionRequestMutationVariables>;
export const FinishAccountDeletionDocument = gql`
    mutation FinishAccountDeletion($token: String!, $password: String!) {
  finishAccountDeletion(token: $token, password: $password) {
    ...FieldError
  }
}
    ${FieldErrorFragmentDoc}`;
export type FinishAccountDeletionMutationFn = Apollo.MutationFunction<FinishAccountDeletionMutation, FinishAccountDeletionMutationVariables>;

/**
 * __useFinishAccountDeletionMutation__
 *
 * To run a mutation, you first call `useFinishAccountDeletionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishAccountDeletionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishAccountDeletionMutation, { data, loading, error }] = useFinishAccountDeletionMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFinishAccountDeletionMutation(baseOptions?: Apollo.MutationHookOptions<FinishAccountDeletionMutation, FinishAccountDeletionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishAccountDeletionMutation, FinishAccountDeletionMutationVariables>(FinishAccountDeletionDocument, options);
      }
export type FinishAccountDeletionMutationHookResult = ReturnType<typeof useFinishAccountDeletionMutation>;
export type FinishAccountDeletionMutationResult = Apollo.MutationResult<FinishAccountDeletionMutation>;
export type FinishAccountDeletionMutationOptions = Apollo.BaseMutationOptions<FinishAccountDeletionMutation, FinishAccountDeletionMutationVariables>;
export const ValidateAccountDeletionTokenDocument = gql`
    mutation ValidateAccountDeletionToken($token: String!) {
  validateAccountDeletionToken(token: $token)
}
    `;
export type ValidateAccountDeletionTokenMutationFn = Apollo.MutationFunction<ValidateAccountDeletionTokenMutation, ValidateAccountDeletionTokenMutationVariables>;

/**
 * __useValidateAccountDeletionTokenMutation__
 *
 * To run a mutation, you first call `useValidateAccountDeletionTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateAccountDeletionTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateAccountDeletionTokenMutation, { data, loading, error }] = useValidateAccountDeletionTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateAccountDeletionTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidateAccountDeletionTokenMutation, ValidateAccountDeletionTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateAccountDeletionTokenMutation, ValidateAccountDeletionTokenMutationVariables>(ValidateAccountDeletionTokenDocument, options);
      }
export type ValidateAccountDeletionTokenMutationHookResult = ReturnType<typeof useValidateAccountDeletionTokenMutation>;
export type ValidateAccountDeletionTokenMutationResult = Apollo.MutationResult<ValidateAccountDeletionTokenMutation>;
export type ValidateAccountDeletionTokenMutationOptions = Apollo.BaseMutationOptions<ValidateAccountDeletionTokenMutation, ValidateAccountDeletionTokenMutationVariables>;
export const ValidateAccountDeletionTokenWithPasswordDocument = gql`
    mutation ValidateAccountDeletionTokenWithPassword($password: String!, $token: String!) {
  validateAccountDeletionTokenWithPassword(password: $password, token: $token)
}
    `;
export type ValidateAccountDeletionTokenWithPasswordMutationFn = Apollo.MutationFunction<ValidateAccountDeletionTokenWithPasswordMutation, ValidateAccountDeletionTokenWithPasswordMutationVariables>;

/**
 * __useValidateAccountDeletionTokenWithPasswordMutation__
 *
 * To run a mutation, you first call `useValidateAccountDeletionTokenWithPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateAccountDeletionTokenWithPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateAccountDeletionTokenWithPasswordMutation, { data, loading, error }] = useValidateAccountDeletionTokenWithPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateAccountDeletionTokenWithPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ValidateAccountDeletionTokenWithPasswordMutation, ValidateAccountDeletionTokenWithPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateAccountDeletionTokenWithPasswordMutation, ValidateAccountDeletionTokenWithPasswordMutationVariables>(ValidateAccountDeletionTokenWithPasswordDocument, options);
      }
export type ValidateAccountDeletionTokenWithPasswordMutationHookResult = ReturnType<typeof useValidateAccountDeletionTokenWithPasswordMutation>;
export type ValidateAccountDeletionTokenWithPasswordMutationResult = Apollo.MutationResult<ValidateAccountDeletionTokenWithPasswordMutation>;
export type ValidateAccountDeletionTokenWithPasswordMutationOptions = Apollo.BaseMutationOptions<ValidateAccountDeletionTokenWithPasswordMutation, ValidateAccountDeletionTokenWithPasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    ...FieldError
  }
}
    ${FieldErrorFragmentDoc}`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(token: $token, password: $password) {
    ...FieldError
  }
}
    ${FieldErrorFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const FinishRegisterDocument = gql`
    mutation FinishRegister($token: String!, $options: RegisterInput!, $password: String!) {
  finishRegister(token: $token, options: $options, password: $password) {
    error {
      ...FieldError
    }
    user {
      ...FullUser
    }
  }
}
    ${FieldErrorFragmentDoc}
${FullUserFragmentDoc}`;
export type FinishRegisterMutationFn = Apollo.MutationFunction<FinishRegisterMutation, FinishRegisterMutationVariables>;

/**
 * __useFinishRegisterMutation__
 *
 * To run a mutation, you first call `useFinishRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishRegisterMutation, { data, loading, error }] = useFinishRegisterMutation({
 *   variables: {
 *      token: // value for 'token'
 *      options: // value for 'options'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useFinishRegisterMutation(baseOptions?: Apollo.MutationHookOptions<FinishRegisterMutation, FinishRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinishRegisterMutation, FinishRegisterMutationVariables>(FinishRegisterDocument, options);
      }
export type FinishRegisterMutationHookResult = ReturnType<typeof useFinishRegisterMutation>;
export type FinishRegisterMutationResult = Apollo.MutationResult<FinishRegisterMutation>;
export type FinishRegisterMutationOptions = Apollo.BaseMutationOptions<FinishRegisterMutation, FinishRegisterMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: RegisterInput!) {
  register(options: $options) {
    ...FieldError
  }
}
    ${FieldErrorFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ValidateRegisterTokenDocument = gql`
    mutation ValidateRegisterToken($token: String!) {
  validateRegisterToken(token: $token)
}
    `;
export type ValidateRegisterTokenMutationFn = Apollo.MutationFunction<ValidateRegisterTokenMutation, ValidateRegisterTokenMutationVariables>;

/**
 * __useValidateRegisterTokenMutation__
 *
 * To run a mutation, you first call `useValidateRegisterTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateRegisterTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateRegisterTokenMutation, { data, loading, error }] = useValidateRegisterTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateRegisterTokenMutation(baseOptions?: Apollo.MutationHookOptions<ValidateRegisterTokenMutation, ValidateRegisterTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateRegisterTokenMutation, ValidateRegisterTokenMutationVariables>(ValidateRegisterTokenDocument, options);
      }
export type ValidateRegisterTokenMutationHookResult = ReturnType<typeof useValidateRegisterTokenMutation>;
export type ValidateRegisterTokenMutationResult = Apollo.MutationResult<ValidateRegisterTokenMutation>;
export type ValidateRegisterTokenMutationOptions = Apollo.BaseMutationOptions<ValidateRegisterTokenMutation, ValidateRegisterTokenMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($userId: Int!) {
  follow(userId: $userId) {
    error
    users {
      ...FullUser
    }
  }
}
    ${FullUserFragmentDoc}`;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($options: LoginInput!) {
  login(options: $options) {
    error {
      ...FieldError
    }
    user {
      ...FullUser
    }
  }
}
    ${FieldErrorFragmentDoc}
${FullUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ChatDocument = gql`
    query Chat($chatId: String!) {
  chat(chatId: $chatId) {
    ...MinimalChatResponse
  }
}
    ${MinimalChatResponseFragmentDoc}`;

/**
 * __useChatQuery__
 *
 * To run a query within a React component, call `useChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useChatQuery(baseOptions: Apollo.QueryHookOptions<ChatQuery, ChatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
      }
export function useChatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatQuery, ChatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatQuery, ChatQueryVariables>(ChatDocument, options);
        }
export type ChatQueryHookResult = ReturnType<typeof useChatQuery>;
export type ChatLazyQueryHookResult = ReturnType<typeof useChatLazyQuery>;
export type ChatQueryResult = Apollo.QueryResult<ChatQuery, ChatQueryVariables>;
export const ChatsDocument = gql`
    query Chats($limit: Int!, $skip: Int) {
  chats(limit: $limit, skip: $skip) {
    ...PaginatedChats
  }
}
    ${PaginatedChatsFragmentDoc}`;

/**
 * __useChatsQuery__
 *
 * To run a query within a React component, call `useChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useChatsQuery(baseOptions: Apollo.QueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
      }
export function useChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChatsQuery, ChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChatsQuery, ChatsQueryVariables>(ChatsDocument, options);
        }
export type ChatsQueryHookResult = ReturnType<typeof useChatsQuery>;
export type ChatsLazyQueryHookResult = ReturnType<typeof useChatsLazyQuery>;
export type ChatsQueryResult = Apollo.QueryResult<ChatsQuery, ChatsQueryVariables>;
export const MessagesDocument = gql`
    query Messages($chatId: String!, $limit: Int!, $skip: Int) {
  messages(chatId: $chatId, limit: $limit, skip: $skip) {
    ...PaginatedMessages
  }
}
    ${PaginatedMessagesFragmentDoc}`;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    ...FullPost
  }
}
    ${FullPostFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $skip: Int, $parentPostId: String, $isReply: Boolean, $userId: Int, $query: String, $fromFollowed: Boolean, $likedBy: Int) {
  posts(
    limit: $limit
    skip: $skip
    parentPostId: $parentPostId
    isReply: $isReply
    userId: $userId
    query: $query
    fromFollowed: $fromFollowed
    likedBy: $likedBy
  ) {
    ...PaginatedPosts
  }
}
    ${PaginatedPostsFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      parentPostId: // value for 'parentPostId'
 *      isReply: // value for 'isReply'
 *      userId: // value for 'userId'
 *      query: // value for 'query'
 *      fromFollowed: // value for 'fromFollowed'
 *      likedBy: // value for 'likedBy'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const FollowersDocument = gql`
    query Followers($limit: Int!, $skip: Int, $userId: Int!) {
  followers(limit: $limit, skip: $skip, userId: $userId) {
    ...PaginatedUsers
  }
}
    ${PaginatedUsersFragmentDoc}`;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowersQuery(baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
      }
export function useFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersQuery, FollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(FollowersDocument, options);
        }
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<typeof useFollowersLazyQuery>;
export type FollowersQueryResult = Apollo.QueryResult<FollowersQuery, FollowersQueryVariables>;
export const FollowingsDocument = gql`
    query Followings($limit: Int!, $skip: Int, $userId: Int!) {
  followings(limit: $limit, skip: $skip, userId: $userId) {
    ...PaginatedUsers
  }
}
    ${PaginatedUsersFragmentDoc}`;

/**
 * __useFollowingsQuery__
 *
 * To run a query within a React component, call `useFollowingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFollowingsQuery(baseOptions: Apollo.QueryHookOptions<FollowingsQuery, FollowingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FollowingsQuery, FollowingsQueryVariables>(FollowingsDocument, options);
      }
export function useFollowingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingsQuery, FollowingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FollowingsQuery, FollowingsQueryVariables>(FollowingsDocument, options);
        }
export type FollowingsQueryHookResult = ReturnType<typeof useFollowingsQuery>;
export type FollowingsLazyQueryHookResult = ReturnType<typeof useFollowingsLazyQuery>;
export type FollowingsQueryResult = Apollo.QueryResult<FollowingsQuery, FollowingsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
    query User($id: Int, $uid: String) {
  user(id: $id, uid: $uid) {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users($limit: Int!, $skip: Int, $query: String, $location: String, $notMe: Boolean) {
  users(
    limit: $limit
    skip: $skip
    query: $query
    location: $location
    notMe: $notMe
  ) {
    ...PaginatedUsers
  }
}
    ${PaginatedUsersFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      query: // value for 'query'
 *      location: // value for 'location'
 *      notMe: // value for 'notMe'
 *   },
 * });
 */
export function useUsersQuery(baseOptions: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const OnMessageDeletedDocument = gql`
    subscription onMessageDeleted($chatId: String!) {
  onMessageDeleted(chatId: $chatId)
}
    `;

/**
 * __useOnMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useOnMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageDeletedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useOnMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnMessageDeletedSubscription, OnMessageDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnMessageDeletedSubscription, OnMessageDeletedSubscriptionVariables>(OnMessageDeletedDocument, options);
      }
export type OnMessageDeletedSubscriptionHookResult = ReturnType<typeof useOnMessageDeletedSubscription>;
export type OnMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<OnMessageDeletedSubscription>;
export const OnMessageUpdatedDocument = gql`
    subscription onMessageUpdated($chatId: String!) {
  onMessageUpdated(chatId: $chatId) {
    ...FullMessage
  }
}
    ${FullMessageFragmentDoc}`;

/**
 * __useOnMessageUpdatedSubscription__
 *
 * To run a query within a React component, call `useOnMessageUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMessageUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMessageUpdatedSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useOnMessageUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnMessageUpdatedSubscription, OnMessageUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnMessageUpdatedSubscription, OnMessageUpdatedSubscriptionVariables>(OnMessageUpdatedDocument, options);
      }
export type OnMessageUpdatedSubscriptionHookResult = ReturnType<typeof useOnMessageUpdatedSubscription>;
export type OnMessageUpdatedSubscriptionResult = Apollo.SubscriptionResult<OnMessageUpdatedSubscription>;
export const OnNewMessageDocument = gql`
    subscription onNewMessage($chatId: String!) {
  onNewMessage(chatId: $chatId) {
    ...FullMessage
  }
}
    ${FullMessageFragmentDoc}`;

/**
 * __useOnNewMessageSubscription__
 *
 * To run a query within a React component, call `useOnNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useOnNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNewMessageSubscription, OnNewMessageSubscriptionVariables>(OnNewMessageDocument, options);
      }
export type OnNewMessageSubscriptionHookResult = ReturnType<typeof useOnNewMessageSubscription>;
export type OnNewMessageSubscriptionResult = Apollo.SubscriptionResult<OnNewMessageSubscription>;
export const OnMyUserUpdateDocument = gql`
    subscription onMyUserUpdate {
  onMyUserUpdate {
    ...FullUser
  }
}
    ${FullUserFragmentDoc}`;

/**
 * __useOnMyUserUpdateSubscription__
 *
 * To run a query within a React component, call `useOnMyUserUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnMyUserUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnMyUserUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnMyUserUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnMyUserUpdateSubscription, OnMyUserUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnMyUserUpdateSubscription, OnMyUserUpdateSubscriptionVariables>(OnMyUserUpdateDocument, options);
      }
export type OnMyUserUpdateSubscriptionHookResult = ReturnType<typeof useOnMyUserUpdateSubscription>;
export type OnMyUserUpdateSubscriptionResult = Apollo.SubscriptionResult<OnMyUserUpdateSubscription>;
export const OnUserStatusUpdateDocument = gql`
    subscription onUserStatusUpdate($id: Int) {
  onUserStatusUpdate(id: $id) {
    id
    isOnline
    lastSeen
  }
}
    `;

/**
 * __useOnUserStatusUpdateSubscription__
 *
 * To run a query within a React component, call `useOnUserStatusUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUserStatusUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUserStatusUpdateSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOnUserStatusUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnUserStatusUpdateSubscription, OnUserStatusUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnUserStatusUpdateSubscription, OnUserStatusUpdateSubscriptionVariables>(OnUserStatusUpdateDocument, options);
      }
export type OnUserStatusUpdateSubscriptionHookResult = ReturnType<typeof useOnUserStatusUpdateSubscription>;
export type OnUserStatusUpdateSubscriptionResult = Apollo.SubscriptionResult<OnUserStatusUpdateSubscription>;