import { Post } from "../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { validateBody, validateTitle } from "../validation/PostValidator";
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
import { MyContext } from "../MyContext";
import { FieldError } from "./FieldError";
import { User } from "../entity/User";
import { getConnection } from "typeorm";
import { Like } from "../entity/Like";
import { Comment } from "../entity/Comment";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  body: string;
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
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
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
  async creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
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

  // COMMENTS COUNT
  @FieldResolver(() => Int)
  async commentsCount(@Root() post: Post) {
    const [, count] = await Comment.findAndCount({
      where: {
        postId: post.id,
        parentId: null,
      },
    });

    return count;
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
    @Arg("userId", () => Int, { nullable: true }) userId: number,
    @Arg("query", () => String, { nullable: true }) query: string
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('p."createdAt"', "DESC")
      .take(realLimitPlusOne);

    if (userId) {
      qb.where(
        `
          p."creatorId" = :userId
        `,
        { userId }
      );
    }

    if (query) {
      if (query.charAt(0) === "@" && !userId) {
        query = query.slice(1, query.length);
        qb.andWhere(
          `lower((select uid from users where id = p."creatorId"))
          like lower(:query)`,
          {
            query: `%${query}%`,
          }
        );
      } else {
        qb.andWhere(
          `lower(p.title) like lower(:query) or lower(p.body) like lower(:query)`,
          {
            query: `%${query}%`,
          }
        );
      }
    }

    if (skip && skip > 0) {
      qb.skip(skip);
    }

    const posts = await qb.getMany();

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
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
  async like(
    @Arg("postId", () => String) postId: string,
    @Ctx() { req }: MyContext
  ): Promise<MinimalPostResponse> {
    const { userId } = req.session;

    const me = await User.findOne(userId);
    if (!me) {
      throw new Error("User not found");
    }

    const post = await Post.findOne(postId);
    if (!post || post.creatorId === req.session.userId) {
      return {
        error: true,
      };
    }

    const like = await Like.findOne({
      where: {
        userId,
        postId,
      },
    });

    // user wants to remove like
    if (like) {
      await Like.delete({
        userId,
        postId,
      });

      post.points -= 1;
    }
    // user wants to like
    else {
      await Like.insert({
        userId,
        postId,
      });

      post.points += 1;
    }

    return {
      post,
    };
  }

  // CREATE POST
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("options", () => PostInput) options: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<PostResponse> {
    const { userId } = req.session;
    const me = await User.findOne(userId);
    if (!me) {
      throw new Error("User not found");
    }

    // validate title
    const titleValidation = validateTitle(options.title);
    if (titleValidation) {
      return {
        error: {
          ...titleValidation,
        },
      };
    }

    // validate body
    const bodyValidation = validateBody(options.body);
    if (bodyValidation) {
      return {
        error: {
          ...bodyValidation,
        },
      };
    }

    // create post
    const post = Post.create({
      title: options.title,
      body: options.body,
      creatorId: req.session.userId,
    });

    // insert post into db
    await post.save();

    return {
      post,
    };
  }

  // DELETE POST
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => String) id: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    if (
      !(await Post.findOne({
        where: {
          id,
          creatorId: req.session.userId,
        },
      }))
    ) {
      // the post isn't owned by you
      return false;
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

    return true;
  }
}
