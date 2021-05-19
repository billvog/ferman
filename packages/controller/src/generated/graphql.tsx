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
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  userId: Scalars['Float'];
  user: User;
  postId: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  repliesCount: Scalars['Float'];
};

export type CommentInput = {
  text: Scalars['String'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  error?: Maybe<FieldError>;
  comment?: Maybe<Comment>;
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

export type MinimalPostIdResponse = {
  __typename?: 'MinimalPostIdResponse';
  postId: Scalars['String'];
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
  likePost: MinimalPostResponse;
  createPost: PostResponse;
  deletePost: MinimalPostIdResponse;
  updateProfile: ProfileResponse;
  createComment: CommentResponse;
  deleteComment: Scalars['Boolean'];
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


export type MutationLikePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  options: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  options: ProfileInput;
};


export type MutationCreateCommentArgs = {
  options: CommentInput;
  parentId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  parent?: Maybe<Comment>;
  comments: Array<Comment>;
  hasMore: Scalars['Boolean'];
  count: Scalars['Int'];
  executionTime: Scalars['Float'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
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
  points: Scalars['Float'];
  commentsCount: Scalars['Float'];
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
  followers?: Maybe<PaginatedUsers>;
  followings?: Maybe<PaginatedUsers>;
  user?: Maybe<User>;
  users: PaginatedUsers;
  me?: Maybe<User>;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  comments: PaginatedComments;
  comment: PaginatedComments;
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
  location?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryPostsArgs = {
  feedMode?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryCommentsArgs = {
  postId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryCommentArgs = {
  id: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type RegisterInput = {
  uid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  birthdate: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  uid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type FieldErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type FullCommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'postId' | 'parentId' | 'repliesCount' | 'text' | 'createdAt'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatarUrl'>
    )> }
  ) }
);

export type FullPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'body' | 'points' | 'commentsCount' | 'likeStatus' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'uid' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'avatarUrl'>
    )> }
  ) }
);

export type FullProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'avatarUrl' | 'bannerUrl' | 'bio' | 'location' | 'birthdate' | 'showBirthdate'>
);

export type FullUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'uid' | 'username' | 'email' | 'createdAt' | 'followsYouStatus' | 'followingStatus' | 'followersCount' | 'followingsCount'>
  & { profile?: Maybe<(
    { __typename?: 'Profile' }
    & FullProfileFragment
  )> }
);

export type MinimalPostIdResponseFragment = (
  { __typename?: 'MinimalPostIdResponse' }
  & Pick<MinimalPostIdResponse, 'error' | 'postId'>
);

export type PaginatedCommentsFragment = (
  { __typename?: 'PaginatedComments' }
  & Pick<PaginatedComments, 'hasMore' | 'executionTime' | 'count'>
  & { parent?: Maybe<(
    { __typename?: 'Comment' }
    & FullCommentFragment
  )>, comments: Array<(
    { __typename?: 'Comment' }
    & FullCommentFragment
  )> }
);

export type PaginatedPostsFragment = (
  { __typename?: 'PaginatedPosts' }
  & Pick<PaginatedPosts, 'hasMore' | 'executionTime' | 'count'>
  & { posts: Array<(
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

export type CreateCommentMutationVariables = Exact<{
  options: CommentInput;
  id: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CommentResponse' }
    & { error?: Maybe<(
      { __typename?: 'FieldError' }
      & FieldErrorFragment
    )>, comment?: Maybe<(
      { __typename?: 'Comment' }
      & FullCommentFragment
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
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

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
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
  postId: Scalars['String'];
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

export type CommentQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
}>;


export type CommentQuery = (
  { __typename?: 'Query' }
  & { comment: (
    { __typename?: 'PaginatedComments' }
    & PaginatedCommentsFragment
  ) }
);

export type CommentsQueryVariables = Exact<{
  limit: Scalars['Int'];
  skip?: Maybe<Scalars['Int']>;
  postId: Scalars['String'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: (
    { __typename?: 'PaginatedComments' }
    & PaginatedCommentsFragment
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
  userId?: Maybe<Scalars['Int']>;
  query?: Maybe<Scalars['String']>;
  feedMode?: Maybe<Scalars['Boolean']>;
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
  location?: Maybe<Scalars['String']>;
}>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: (
    { __typename?: 'PaginatedUsers' }
    & PaginatedUsersFragment
  ) }
);

export const FieldErrorFragmentDoc = gql`
    fragment FieldError on FieldError {
  field
  message
}
    `;
export const MinimalPostIdResponseFragmentDoc = gql`
    fragment MinimalPostIdResponse on MinimalPostIdResponse {
  error
  postId
}
    `;
export const FullCommentFragmentDoc = gql`
    fragment FullComment on Comment {
  id
  postId
  parentId
  repliesCount
  text
  createdAt
  user {
    id
    uid
    username
    profile {
      avatarUrl
    }
  }
}
    `;
export const PaginatedCommentsFragmentDoc = gql`
    fragment PaginatedComments on PaginatedComments {
  hasMore
  executionTime
  count
  parent {
    ...FullComment
  }
  comments {
    ...FullComment
  }
}
    ${FullCommentFragmentDoc}`;
export const FullPostFragmentDoc = gql`
    fragment FullPost on Post {
  id
  body
  points
  commentsCount
  likeStatus
  createdAt
  creator {
    id
    uid
    username
    profile {
      avatarUrl
    }
  }
}
    `;
export const PaginatedPostsFragmentDoc = gql`
    fragment PaginatedPosts on PaginatedPosts {
  hasMore
  executionTime
  count
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
}
    `;
export const FullUserFragmentDoc = gql`
    fragment FullUser on User {
  id
  uid
  username
  email
  createdAt
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
export const CreateCommentDocument = gql`
    mutation CreateComment($options: CommentInput!, $id: String!, $parentId: String) {
  createComment(options: $options, id: $id, parentId: $parentId) {
    error {
      ...FieldError
    }
    comment {
      ...FullComment
    }
  }
}
    ${FieldErrorFragmentDoc}
${FullCommentFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      options: // value for 'options'
 *      id: // value for 'id'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($options: PostInput!) {
  createPost(options: $options) {
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
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: String!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
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
    mutation LikePost($postId: String!) {
  likePost(postId: $postId) {
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
 *      postId: // value for 'postId'
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
export const CommentDocument = gql`
    query Comment($limit: Int!, $skip: Int, $id: String!) {
  comment(limit: $limit, skip: $skip, id: $id) {
    ...PaginatedComments
  }
}
    ${PaginatedCommentsFragmentDoc}`;

/**
 * __useCommentQuery__
 *
 * To run a query within a React component, call `useCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommentQuery(baseOptions: Apollo.QueryHookOptions<CommentQuery, CommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
      }
export function useCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentQuery, CommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentQuery, CommentQueryVariables>(CommentDocument, options);
        }
export type CommentQueryHookResult = ReturnType<typeof useCommentQuery>;
export type CommentLazyQueryHookResult = ReturnType<typeof useCommentLazyQuery>;
export type CommentQueryResult = Apollo.QueryResult<CommentQuery, CommentQueryVariables>;
export const CommentsDocument = gql`
    query Comments($limit: Int!, $skip: Int, $postId: String!) {
  comments(limit: $limit, skip: $skip, postId: $postId) {
    ...PaginatedComments
  }
}
    ${PaginatedCommentsFragmentDoc}`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
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
    query Posts($limit: Int!, $skip: Int, $userId: Int, $query: String, $feedMode: Boolean) {
  posts(
    limit: $limit
    skip: $skip
    userId: $userId
    query: $query
    feedMode: $feedMode
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
 *      userId: // value for 'userId'
 *      query: // value for 'query'
 *      feedMode: // value for 'feedMode'
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
    query Users($limit: Int!, $skip: Int, $location: String) {
  users(limit: $limit, skip: $skip, location: $location) {
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
 *      location: // value for 'location'
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