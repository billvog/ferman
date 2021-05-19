import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types/MyContext";
import { COMMENT_TEXT_SHAPE } from "@ferman-pkgs/common";
import { FieldError } from "./FieldError";

@ObjectType()
class CommentResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@ObjectType()
export class MinimalCommentIdResponse {
  @Field(() => String)
  commentId: string;
  @Field(() => String, { nullable: true })
  parentCommentId: string | null;
  @Field(() => String)
  postId: string;
  @Field(() => Boolean)
  error: boolean;
}

@InputType()
class CommentInput {
  @Field()
  text: string;
}

@ObjectType()
class PaginatedComments {
  @Field(() => Comment, { nullable: true })
  parent: Comment | null;
  @Field(() => [Comment])
  comments: Comment[];
  @Field()
  hasMore: boolean;
  @Field(() => Int)
  count: number;
  @Field()
  executionTime: number;
}

@Resolver(() => Comment)
export class PostCommentResolver {
  // USER
  @FieldResolver(() => User)
  user(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(comment.userId);
  }

  // REPLIES COUNT
  @FieldResolver(() => Int)
  repliesCount(@Root() comment: Comment) {
    return getConnection()
      .getRepository(Comment)
      .createQueryBuilder("c")
      .where('c."parentId" = :id', { id: comment.id })
      .getCount();
  }

  // COMMENTS
  @Query(() => PaginatedComments)
  async comments(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("postId", () => String) postId: string
  ): Promise<PaginatedComments> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Comment)
      .createQueryBuilder("c")
      .where('c."postId" = :postId and c."parentId" is null', {
        postId,
      })
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [comments, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      parent: null,
      comments: comments.slice(0, realLimit),
      hasMore: comments.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // GET COMMENT WITH REPLIES
  @Query(() => PaginatedComments)
  async comment(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("id", () => String) id: string
  ): Promise<PaginatedComments> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const parent_qb = getConnection()
      .getRepository(Comment)
      .createQueryBuilder("c")
      .where("c.id = :id", {
        id,
      });

    const replies_qb = getConnection()
      .getRepository(Comment)
      .createQueryBuilder("c")
      .where('c."parentId" = :id', {
        id,
      })
      .orderBy('c."createdAt"', "DESC")
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      replies_qb.offset(skip);
    }

    const parent = await parent_qb.getOne();
    const [replies, count] = await replies_qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      parent: parent || null,
      comments: replies.slice(0, realLimit),
      hasMore: replies.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // CREATE COMMENT
  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("id", () => String) id: string,
    @Arg("parentId", () => String, { nullable: true }) parentId: string | null,
    @Arg("options", () => CommentInput) options: CommentInput,
    @Ctx() { req }: MyContext
  ): Promise<CommentResponse> {
    const { userId } = req.session;
    const me = await User.findOne(userId);
    if (!me) {
      throw new Error("User not found");
    }

    const post = await Post.findOne(id);
    if (!post) {
      throw new Error("Post not found");
    }

    // validate
    try {
      const validation = await COMMENT_TEXT_SHAPE.validate(options.text);
      options.text = validation;
    } catch (error) {
      return {
        error: {
          field: "text",
          message: error.message,
        },
      };
    }

    const comment = Comment.create({
      userId,
      postId: post.id,
      parentId,
      text: options.text,
    });

    await comment.save();

    comment.repliesCount = 0;
    comment.user = me;

    return {
      comment,
    };
  }

  // DELETE COMMENT
  @Mutation(() => MinimalCommentIdResponse)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("id", () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<MinimalCommentIdResponse> {
    const comment = await Comment.findOne({
      where: {
        id,
        userId: req.session.userId,
      },
    });

    if (!comment) {
      return {
        commentId: id,
        postId: "",
        parentCommentId: "",
        error: true,
      };
    }

    await comment.remove();
    return {
      commentId: id,
      postId: comment.postId,
      parentCommentId: comment.parentId,
      error: false,
    };
  }
}
