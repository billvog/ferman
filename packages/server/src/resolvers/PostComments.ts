import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../entity/Comment";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../MyContext";
import { validateCommentText } from "../validators/PostValidator";
import { FieldError } from "./FieldError";

@ObjectType()
class CommentResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@ObjectType()
class CommentWithReplies {
  @Field(() => Comment)
  parent: Comment;
  @Field(() => [Comment])
  replies: Comment[];
}

@InputType()
class CommentInput {
  @Field()
  text: string;
}

@Resolver(() => Comment)
export class PostCommentResolver {
  // COMMENTS
  @Query(() => [Comment], { nullable: true })
  async comments(
    @Arg("postId", () => String) postId: string
  ): Promise<Comment[]> {
    return getConnection().query(
      `
      select c.*,
      count(subc) as "repliesCount",
      to_jsonb(u) - 'password' as user
      from comments c
      inner join users u on c."userId" = u.id
      left join comments subc on subc."parentId" = c.id
      where c."postId" = $1 and c."parentId" is null
      group by c.id, u.*
      order by "createdAt" desc
      `,
      [postId]
    );
  }

  // GET COMMENT WITH REPLIES
  @Query(() => CommentWithReplies)
  async viewComment(
    @Arg("id", () => Int) id: number
  ): Promise<CommentWithReplies> {
    const parent = ((await getConnection().query(
      `
      select c.*,
      count(subc) as "repliesCount",
      to_jsonb(u) - 'password' as user
      from comments c
      inner join users u on c."userId" = u.id
      left join comments subc on subc."parentId" = c.id
      where c.id = $1
      group by c.id, u.*
    `,
      [id]
    )) as any)[0];

    if (!parent) {
      throw new Error("Comment not found");
    }

    const replies = await getConnection().query(
      `
      select c.*,
      count(subc) as "repliesCount",
      to_jsonb(u) - 'password' as user
      from comments c
      inner join users u on c."userId" = u.id
      left join comments subc on subc."parentId" = c.id
      where c."parentId" = $1
      group by c.id, u.*
      order by c."createdAt" desc
    `,
      [parent?.id]
    );

    return {
      parent,
      replies,
    };
  }

  // COMMENT POST
  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("id", () => String) id: string,
    @Arg("parentId", () => Int, { nullable: true }) parentId: number | null,
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

    // validate text
    const textValidation = validateCommentText(options.text);
    if (textValidation) {
      return {
        error: textValidation,
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
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const comment = await Comment.findOne({
      where: {
        id,
        userId: req.session.userId,
      },
    });

    if (!comment) {
      return false;
    }

    await comment.remove();
    return true;
  }
}
