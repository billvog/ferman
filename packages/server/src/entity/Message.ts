import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  chatId: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({ default: false })
  read: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
