import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity("likes")
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @PrimaryColumn()
  postId: string;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
