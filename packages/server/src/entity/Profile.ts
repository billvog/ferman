import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity("profiles")
export class Profile extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  avatarUrl: string;

  @Field()
  bannerUrl: string;

  @Field()
  @Column()
  bio: string;

  @Field()
  @Column()
  location: string;

  @Field(() => String)
  @Column()
  birthdate: Date;

  @Field()
  @Column({ default: false })
  showBirthdate: boolean;

  @Field(() => Int)
  postsCount: number;
  @Field(() => Int)
  commentsCount: number;
  @Field(() => Int)
  likesCount: number;
}
