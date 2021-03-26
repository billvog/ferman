import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity("comments")
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

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

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", default: null })
  parentId: number | null;

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
}
