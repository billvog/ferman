import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Follow } from "./Follow";
import { Like } from "./Like";
import { Post } from "./Post";
import { Profile } from "./Profile";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  uid: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.user)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followingUser)
  followers: Follow[];

  @Field(() => Boolean, { nullable: true }) followsYouStatus: boolean;
  @Field(() => Boolean, { nullable: true }) followingStatus: boolean;
  @Field() followerCount: number;
  @Field() followingCount: number;
}
