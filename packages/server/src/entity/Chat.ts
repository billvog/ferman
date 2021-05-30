import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity("chats")
export class Chat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  senderId: number;

  @ManyToOne(() => User, (user) => user.likes)
  sender: User;

  @Field(() => Int)
  @Column()
  recieverId: number;

  @ManyToOne(() => User, (user) => user.likes)
  reciver: User;

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat, {
    onDelete: "CASCADE",
  })
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
