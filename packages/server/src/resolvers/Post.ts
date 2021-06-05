import { Post } from "../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { PostValidationSchema } from "@ferman-pkgs/common";
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
import { MyContext } from "../types/MyContext";
import { FieldError } from "./FieldError";
import { User } from "../entity/User";
import { getConnection } from "typeorm";
import { Like } from "../entity/Like";

@InputType()
class PostInput {
  @Field()
  body: string;
}

@ObjectType()
export class MinimalPostIdResponse {
  @Field(() => String, { nullable: true })
  postId?: string;
  @Field(() => String, { nullable: true })
  parentPostId?: string;
  @Field(() => Boolean)
  error: boolean;
}

@ObjectType()
export class PostResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => Post, { nullable: true })
  parent: Post | null;
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
  @Field(() => Int)
  count: number;
  @Field()
  executionTime: number;
}

@ObjectType()
export class MinimalPostResponse {
  @Field(() => Boolean, { nullable: true })
  error?: Boolean;
  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(() => Post)
export class PostResolver {
  // CREATOR
  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  // POINTS COUNT
  @FieldResolver(() => Int)
  async points(@Root() post: Post) {
    const [, count] = await Like.findAndCount({
      where: {
        postId: post.id,
      },
    });

    return count;
  }

  // REPLIES COUNT
  @FieldResolver(() => Int)
  async repliesCount(@Root() post: Post) {
    return getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .where('p."parentPostId" = :id', { id: post.id })
      .getCount();
  }

  // PARENT POST
  @FieldResolver(() => Post)
  parentPost(@Root() post: Post, @Ctx() { postLoader }: MyContext) {
    if (post.parentPostId) {
      return postLoader.load(post.parentPostId);
    }

    return null;
  }

  // LIKE STATUS
  @FieldResolver(() => Boolean, { nullable: true })
  async likeStatus(
    @Root() post: Post,
    @Ctx() { likeLoader, req }: MyContext
  ): Promise<Boolean | null> {
    if (!req.session.userId) {
      return null;
    }

    const like = await likeLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    return like ? true : false;
  }

  // GET ALL POSTS
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("parentPostId", () => String, { nullable: true }) parentPostId: string,
    @Arg("userId", () => Int, { nullable: true }) userId: number,
    @Arg("query", () => String, { nullable: true }) query: string,
    @Arg("feedMode", () => Boolean, { nullable: true }) feedMode: boolean,
    @Arg("likedBy", () => Int, { nullable: true }) likedBy: number,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .innerJoinAndSelect("p.creator", "c")
      .orderBy('p."createdAt"', "DESC")
      .limit(realLimitPlusOne);

    let parentPost: Post | undefined;

    if (parentPostId) {
      parentPost = await Post.findOne(parentPostId);
      if (!parentPost) {
        throw new Error("Parent post not found");
      }

      qb.where(
        `
          p."parentPostId" = :parentPostId
        `,
        { parentPostId }
      );
    }

    if (userId) {
      qb.where(
        `
          p."creatorId" = :userId
        `,
        { userId }
      );
    }

    if (query) {
      const formattedQuery = query.trim().replace(/ /g, " | ");
      const docWithWeight = `
        setweight(to_tsvector(c.uid || ' ' || c.username), 'A') ||
        setweight(to_tsvector(coalesce(p.body, '')), 'C')
      `;
      qb.andWhere(`${docWithWeight} @@ plainto_tsquery(:query)`, {
        query: `${formattedQuery}:*`,
      });
      qb.addOrderBy(
        `ts_rank(${docWithWeight}, plainto_tsquery(:query))`,
        "DESC"
      );
    }

    if (likedBy) {
      qb.andWhere(
        `
          p.id in (select "postId" from likes l where l."userId" = :likedBy)
        `,
        { likedBy }
      );
    }

    if (feedMode && req.session.userId) {
      // from your followers
      qb.where(
        `p."creatorId" in (select "followingUserId" from follows where "userId" = :userId)`,
        {
          userId: req.session.userId,
        }
      );
      // don't show your posts
      qb.andWhere(
        `
          p."creatorId" != :userId
        `,
        { userId: req.session.userId }
      );
    }

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [posts, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      parent: parentPost || null,
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // GET POST BY ID
  @Query(() => Post, { nullable: true })
  async post(@Arg("id", () => String) id: string): Promise<Post | null> {
    return (await Post.findOne(id)) || null;
  }

  // LIKE/UNLIKE POST
  @Mutation(() => MinimalPostResponse)
  @UseMiddleware(isAuth)
  async likePost(
    @Arg("id", () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<MinimalPostResponse> {
    const { userId } = req.session;

    const me = await User.findOne(userId);
    if (!me) {
      throw new Error("User not found");
    }

    const post = await Post.findOne(id);
    if (!post || post.creatorId === req.session.userId) {
      return {
        error: true,
      };
    }

    const like = await Like.findOne({
      where: {
        userId,
        id,
      },
    });

    // user wants to remove like
    if (like) {
      await Like.delete({
        userId,
        postId: id,
      });
    }
    // user wants to like
    else {
      await Like.insert({
        userId,
        postId: id,
      });
    }

    return {
      post,
    };
  }

  // CREATE POST
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("parentPostId", () => String, { nullable: true }) parentPostId: string,
    @Arg("options", () => PostInput) options: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    const { userId } = req.session;
    const me = await User.findOne(userId);
    if (!me) {
      throw new Error("User not found");
    }

    // validate
    try {
      const validation = await PostValidationSchema.validate(options);
      options = validation;
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    // create post
    const post = Post.create({
      body: options.body,
      creatorId: req.session.userId,
    });

    if (parentPostId) {
      const parentPost = await Post.findOne(parentPostId);
      if (!parentPost)
        return {
          error: {
            field: "_",
            message: "post.alert.parent_doesnt_exists",
          },
        };
      else {
        post.parentPostId = parentPost.id;
      }
    }

    // insert post into db
    await post.save();

    return {
      post,
    };
  }

  // DELETE POST
  @Mutation(() => MinimalPostIdResponse)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<MinimalPostIdResponse> {
    const post = await Post.findOne({
      where: {
        id,
        creatorId: req.session.userId,
      },
    });

    if (!post) {
      // the post isn't owned by you or doesn't exists
      return {
        error: true,
      };
    }

    getConnection().transaction(async (tm) => {
      await tm.delete(Like, {
        postId: id,
      });

      await tm.delete(Comment, {
        postId: id,
      });

      await tm.delete(Post, {
        id,
        creatorId: req.session.userId,
      });
    });

    return {
      postId: post.id,
      parentPostId: post.parentPostId || undefined,
      error: false,
    };
  }
}
