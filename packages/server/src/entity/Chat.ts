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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @Field(() => Int)
  @Column()
  recieverId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  reciever: User;

  @OneToMany(() => Message, (message) => message.chat, {
    onDelete: "CASCADE",
  })
  messages: Message[];

  @Field(() => Message, { nullable: true })
  latestMessage: Message | null;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
