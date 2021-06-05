import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { Like } from "./Like";
import { User } from "./User";

@ObjectType()
@Entity("posts")
export class Post extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  body: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", default: null })
  parentPostId: string | null;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.replies, {
    onDelete: "CASCADE",
  })
  parentPost: Post | null;

  @OneToMany(() => Post, (post) => post.parentPost)
  replies: Post[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Field() points: number;
  @Field() repliesCount: number;
  @Field(() => Boolean, { nullable: true }) likeStatus: boolean | null;

  @BeforeInsert()
  private generateId() {
    this.id = Math.random().toString().slice(6);
  }
}
