import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@ObjectType()
@Entity("chats")
export class Chat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

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

  @BeforeInsert()
  private generateId() {
    this.id = Math.random().toString().slice(6);
  }
}
