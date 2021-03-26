import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("follows")
export class Follow extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.following)
  user: User;

  @PrimaryColumn()
  followingUserId: number;

  @ManyToOne(() => User, (user) => user.followers)
  followingUser: User;
}
