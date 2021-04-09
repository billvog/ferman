import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity("comments")
export class Comment extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field()
  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field()
  @Column()
  text: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null })
  parentId: string | null;

  @Field()
  repliesCount: number;

  @ManyToOne(() => Comment, (comment) => comment.parent, {
    onDelete: "CASCADE",
  })
  replies: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, {
    onDelete: "CASCADE",
  })
  parent: Comment;

  @BeforeInsert()
  private generateId() {
    this.id = Math.random().toString().slice(2);
  }
}
