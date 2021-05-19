import { hash, verify } from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Db, getConnection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import uniqid from "uniqid";
import {
  PROCEED_REGISTER_TOKEN_PREFIX,
  FORGOT_PWD_TOKEN_PREFIX,
  FRONTEND_URL,
  SESSION_COOKIE_NAME,
  PROCEED_ACC_DEL_TOKEN_PREFIX,
} from "../constants";
import { Follow } from "../entity/Follow";
import { Post } from "../entity/Post";
import { Profile } from "../entity/Profile";
import { User } from "../entity/User";
import { isAuth, isNotAuth } from "../middleware/isAuth";
import { MyContext } from "../types/MyContext";
import { sendEmail } from "../utils/sendEmail";
import { FieldError } from "./FieldError";
import {
  ForgotPasswordValidationSchema,
  LoginValidationSchema,
  RegisterOneValidationSchema,
  RegisterFourValidationSchema,
  ResetPasswordValidationSchema,
  PASSWORD_SHAPE,
} from "@ferman-pkgs/common";
import { Like } from "../entity/Like";
import { Comment } from "../entity/Comment";

@ObjectType()
class UserErrorResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class MinimalUsersResponse {
  @Field(() => Boolean, { nullable: true })
  error?: Boolean;

  @Field(() => [User], { nullable: true })
  users?: User[];
}

@InputType()
class RegisterInput {
  @Field()
  uid: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  birthdate: string;
}

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  users: User[];
  @Field()
  hasMore: boolean;
  @Field(() => Int)
  count: number;
  @Field()
  executionTime: number;
}

@Resolver(User)
export class UserResolver {
  // PROTECT EMAIL FIELD
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }

    return "";
  }

  // PROFILE
  @FieldResolver(() => Profile, { nullable: true })
  profile(@Root() user: User): Promise<Profile | undefined> {
    return Profile.findOne({
      where: { userId: user.id },
    });
  }

  // FOLLOWS YOU STATUS
  @FieldResolver(() => Boolean, { nullable: true })
  async followsYouStatus(
    @Root() user: User,
    @Ctx() { req }: MyContext
  ): Promise<Boolean | null> {
    if (!req.session.userId) {
      return null;
    }

    if (
      await Follow.findOne({
        where: {
          userId: user.id,
          followingUserId: req.session.userId,
        },
      })
    ) {
      return true;
    }

    return false;
  }

  // FOLLOWING STATUS
  @FieldResolver(() => Boolean, { nullable: true })
  async followingStatus(
    @Root() user: User,
    @Ctx() { req }: MyContext
  ): Promise<Boolean | null> {
    if (!req.session.userId) {
      return null;
    }

    if (
      await Follow.findOne({
        where: {
          userId: req.session.userId,
          followingUserId: user.id,
        },
      })
    ) {
      return true;
    }

    return false;
  }

  // FOLLOWER COUNT
  @FieldResolver(() => Int)
  async followersCount(@Root() user: User) {
    const [, count] = await Follow.findAndCount({
      where: {
        followingUserId: user.id,
      },
    });

    return count;
  }

  // FOLLOWS COUNT
  @FieldResolver(() => Int)
  async followingsCount(@Root() user: User) {
    const [, count] = await Follow.findAndCount({
      where: {
        userId: user.id,
      },
    });

    return count;
  }

  // FOLLOWERS
  @Query(() => PaginatedUsers, { nullable: true })
  async followers(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("userId", () => Int) userId: number
  ): Promise<PaginatedUsers> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where(
        'u.id IN (select "userId" from follows f where f."followingUserId"=:userId)',
        {
          userId,
        }
      )
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [users, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      users: users.slice(0, realLimit),
      hasMore: users.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // FOLLOWINGS
  @Query(() => PaginatedUsers, { nullable: true })
  async followings(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("userId", () => Int) userId: number
  ): Promise<PaginatedUsers> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .where(
        'u.id IN (select "followingUserId" from follows f where f."userId"=:userId)',
        {
          userId,
        }
      )
      .limit(realLimitPlusOne);

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [users, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      users: users.slice(0, realLimit),
      hasMore: users.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // FOLLOW/UNFOLLOW
  @Mutation(() => MinimalUsersResponse)
  @UseMiddleware(isAuth)
  async follow(
    @Arg("userId", () => Int) userId: number,
    @Ctx() { req }: MyContext
  ): Promise<MinimalUsersResponse> {
    const { userId: myUserId } = req.session;

    const me = await User.findOne(myUserId);
    if (!me) {
      throw new Error("User not found");
    }

    if (userId === myUserId) {
      return {
        error: true,
      };
    }

    const user = await User.findOne(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const follow = await Follow.findOne({
      where: {
        userId: myUserId,
        followingUserId: user.id,
      },
    });

    // unfollow
    if (follow) {
      await Follow.delete({
        userId: myUserId,
        followingUserId: user.id,
      });

      user.followersCount -= 1;
      me.followingsCount -= 1;
    }
    // follow
    else {
      await Follow.insert({
        userId: myUserId,
        followingUserId: user.id,
      });

      user.followersCount += 1;
      me.followingsCount += 1;
    }

    return {
      users: [me, user],
    };
  }

  // GET USER
  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("uid", () => String, { nullable: true }) uid: string
  ): Promise<User | undefined> | null {
    if (id) {
      return User.findOne(id);
    } else if (uid) {
      return User.findOne({
        where: { uid },
      });
    } else {
      return null;
    }
  }

  // GET USERS
  @Query(() => PaginatedUsers)
  async users(
    @Arg("limit", () => Int) limit: number,
    @Arg("skip", () => Int, { nullable: true }) skip: number,
    @Arg("location", () => String, { nullable: true }) location: string
  ): Promise<PaginatedUsers> {
    const start = Date.now();

    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const qb = getConnection()
      .getRepository(User)
      .createQueryBuilder("u")
      .innerJoin(Profile, "p", 'p."userId" = u.id')
      .limit(realLimitPlusOne);

    if (location) {
      qb.andWhere(`lower(p.location) ilike lower(:location)`, {
        location: `%${location}%`,
      });
    }

    if (skip && skip > 0) {
      qb.offset(skip);
    }

    const [users, count] = await qb.getManyAndCount();

    const end = Date.now();
    const executionTime = end - start;

    return {
      users: users.slice(0, realLimit),
      hasMore: users.length === realLimitPlusOne,
      count,
      executionTime,
    };
  }

  // LOGGED USER
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (typeof req.session.userId === "undefined") {
      return null;
    }

    return (await User.findOne(req.session.userId)) || null;
  }

  // LOGOUT
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolver) => {
      req.session.destroy((error) => {
        if (error) {
          console.error(error);
          return resolver(false);
        }

        res.clearCookie(SESSION_COOKIE_NAME);
        resolver(true);
      });
    });
  }

  // LOGIN
  @Mutation(() => UserErrorResponse)
  @UseMiddleware(isNotAuth)
  async login(
    @Arg("options", () => LoginInput) options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserErrorResponse> {
    try {
      const validation = await LoginValidationSchema.validate(options);
      options = validation;
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    // find user
    const user = await User.findOne({ where: { email: options.email } });
    if (!user) {
      return {
        error: {
          field: "_",
          message: "wrong_credentials",
        },
      };
    }

    // match password
    const passwordIsValid = await verify(user.password, options.password);
    if (!passwordIsValid) {
      return {
        error: {
          field: "_",
          message: "wrong_credentials",
        },
      };
    }

    // login user
    req.session.userId = user.id;

    return {
      user,
    };
  }

  // REGISTER
  @Mutation(() => FieldError, { nullable: true })
  @UseMiddleware(isNotAuth)
  async register(
    @Arg("options", () => RegisterInput) options: RegisterInput,
    @Ctx() { redis }: MyContext
  ): Promise<FieldError | null> {
    try {
      const validation = await RegisterOneValidationSchema.validate({
        uid: options.uid,
        username: options.username,
        email: options.email,
        birthdate: options.birthdate,
      });

      options = {
        uid: validation.uid,
        username: validation.username,
        email: validation.email,
        birthdate: validation.birthdate!.toISOString(),
      };
    } catch (error) {
      return {
        field: error.path,
        message: error.errors[0],
      };
    }

    // check for taken uid
    if (await User.findOne({ where: { uid: options.uid } })) {
      return {
        field: "uid",
        message: "uid_used",
      };
    }

    // check for taken username
    if (await User.findOne({ where: { username: options.username } })) {
      return {
        field: "username",
        message: "username_taken",
      };
    }

    // check for taken email
    if (await User.findOne({ where: { email: options.email } })) {
      return {
        field: "email",
        message: "email_taken",
      };
    }

    // generate token
    const token = uniqid.time();

    // store user in redis
    await redis.set(
      `${PROCEED_REGISTER_TOKEN_PREFIX}${token}`,
      options.email,
      "px",
      1000 * 60 * 60 * 24 // 1 day
    );

    await sendEmail(
      options.email,
      "Finish Your Account Setup",
      `
      Copy and pasted this <code>${token}</code> to proceed your account setup.
      `
    );

    return null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isNotAuth)
  async validateRegisterToken(
    @Arg("token") token: string,
    @Ctx() { redis }: MyContext
  ) {
    const foundToken = await redis.get(
      `${PROCEED_REGISTER_TOKEN_PREFIX}${token}`
    );
    if (!foundToken) {
      return false;
    }

    return true;
  }

  @Mutation(() => UserErrorResponse)
  @UseMiddleware(isNotAuth)
  async finishRegister(
    @Arg("options", () => RegisterInput) options: RegisterInput,
    @Arg("password") password: string,
    @Arg("token") token: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserErrorResponse> {
    // find token in redis
    const foundToken = await redis.get(
      `${PROCEED_REGISTER_TOKEN_PREFIX}${token}`
    );
    if (!foundToken) {
      return {
        error: {
          field: "token",
          message: "invalid_token",
        },
      };
    }

    let validation: any;
    try {
      validation = await RegisterFourValidationSchema.validate({
        uid: options.uid,
        username: options.username,
        email: options.email,
        birthdate: options.birthdate,
        code: token,
        password: password,
      });
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    // validate register token
    if (foundToken !== validation.email) {
      return {
        error: {
          field: "token",
          message: "invalid_token",
        },
      };
    }

    // check for taken uid
    if (await User.findOne({ where: { uid: validation.uid } })) {
      return {
        error: { field: "uid", message: "uid_used" },
      };
    }

    // check for taken username
    if (await User.findOne({ where: { username: validation.username } })) {
      return {
        error: {
          field: "username",
          message: "username_taken",
        },
      };
    }

    // validate password
    let validatedPassword;
    try {
      validatedPassword = await PASSWORD_SHAPE.validate(password);
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    // create password hash
    const hashedPassword = await hash(validatedPassword);

    // create user
    const user = User.create({
      uid: validation.uid,
      username: validation.username,
      email: validation.email,
      password: hashedPassword,
    });

    await getConnection().transaction(async (tm) => {
      // insert user into db
      const insertedUser = await tm.save(user);

      // create & insert profile
      await tm.insert(Profile, {
        userId: insertedUser.id,
        bio: "",
        birthdate: validation.birthdate,
        showBirthdate: false,
        location: "",
      });
    });

    // remove token from redis
    await redis.unlink(`${PROCEED_REGISTER_TOKEN_PREFIX}${token}`);

    // login user
    req.session.userId = user.id;

    return {
      user,
    };
  }

  // FORGOT PASSWORD
  @Mutation(() => FieldError, { nullable: true })
  @UseMiddleware(isNotAuth)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ): Promise<FieldError | null> {
    try {
      const validation = await ForgotPasswordValidationSchema.validate({
        email,
      });
      email = validation.email;
    } catch (error) {
      return {
        field: error.path,
        message: error.errors[0],
      };
    }

    // find user
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    // generate token
    const token = uuidv4();

    // store token in redis
    await redis.set(
      `${FORGOT_PWD_TOKEN_PREFIX}${token}`,
      user.id,
      "px",
      1000 * 60 * 15 // 15 minutes
    );

    await sendEmail(
      user.email,
      "Reset Your Ferman Password",
      `
      Click <a target='_blank' href="${FRONTEND_URL}/account/reset-password/${token}">here</a> to reset your password for Ferman.
    `
    );

    return null;
  }

  // RESET PASSWORD
  @Mutation(() => FieldError, { nullable: true })
  @UseMiddleware(isNotAuth)
  async resetPassword(
    @Arg("password") password: string,
    @Arg("token") token: string,
    @Ctx() { redis }: MyContext
  ): Promise<FieldError | null> {
    try {
      await ResetPasswordValidationSchema.validate({
        password,
      });
    } catch (error) {
      return {
        field: error.path,
        message: error.errors[0],
      };
    }

    // find token in redis
    const foundToken = await redis.get(`${FORGOT_PWD_TOKEN_PREFIX}${token}`);
    if (!foundToken) {
      return {
        field: "token",
        message: "form.error.invalid_token",
      };
    }

    // find user
    const user = await User.findOne(foundToken);
    if (!user) {
      return {
        field: "token",
        message: "form.error.invalid_token",
      };
    }

    // create password hash
    const hashedPassword = await hash(password);

    // check if new password is old password
    if (await verify(user.password, password)) {
      return {
        field: "password",
        message: "reset_pwd.error.new_pwd_defer_from_old",
      };
    }

    user.password = hashedPassword;
    await user.save();

    // delete token
    await redis.del(`${FORGOT_PWD_TOKEN_PREFIX}${token}`);

    return null;
  }

  // DELETE USER
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async accountDeletionRequest(
    @Ctx() { req, redis }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      return false;
    }

    // generate token
    const token = uniqid.time();

    // store token in redis
    await redis.set(
      `${PROCEED_ACC_DEL_TOKEN_PREFIX}${token}`,
      user.id,
      "px",
      1000 * 60 * 15 // 15 minutes
    );

    await sendEmail(
      user.email,
      "Account Deletion Request for Ferman",
      `
      <p>
      A request for deleting your account on ferman (ferman.ga) has been submited and accepted.
      </p>
      <p>
      Copy and pasted this <code>${token}</code> to proceed.
      </p>
      `
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async validateAccountDeletionToken(
    @Arg("token") token: string,
    @Ctx() { redis, req }: MyContext
  ) {
    const foundToken = await redis.get(
      `${PROCEED_ACC_DEL_TOKEN_PREFIX}${token}`
    );
    if (!foundToken || parseInt(foundToken) !== req.session.userId) {
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async validateAccountDeletionTokenWithPassword(
    @Arg("token") token: string,
    @Arg("password") password: string,
    @Ctx() { redis, req }: MyContext
  ) {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const foundToken = await redis.get(
      `${PROCEED_ACC_DEL_TOKEN_PREFIX}${token}`
    );

    // validate token
    if (!foundToken || parseInt(foundToken) !== req.session.userId) {
      return false;
    }

    // validate password
    const valid = await verify(user.password, password);
    if (!valid) {
      return false;
    }

    return true;
  }

  @Mutation(() => FieldError, { nullable: true })
  @UseMiddleware(isAuth)
  async finishAccountDeletion(
    @Arg("token") token: string,
    @Arg("password") password: string,
    @Ctx() { req, res, redis }: MyContext
  ): Promise<FieldError | null> {
    const user = await User.findOne(req.session.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // validate code
    const foundToken = await redis.get(
      `${PROCEED_ACC_DEL_TOKEN_PREFIX}${token}`
    );
    if (!foundToken || parseInt(foundToken) !== user.id) {
      return {
        field: "code",
        message: "delete_account.message.phase2_invalid",
      };
    }

    // validate password
    const valid = await verify(user.password, password);
    if (!valid) {
      return {
        field: "password",
        message: "delete_account.message.phase3_wrong",
      };
    }

    try {
      // delete account
      await getConnection().transaction(async (tm) => {
        await tm.delete(Post, { creatorId: user.id });
        await tm.delete(Like, { userId: user.id });
        await tm.delete(Comment, { userId: user.id });
        await tm.delete(Follow, { userId: user.id });
        await tm.delete(Follow, { followingUserId: user.id });
        await tm.delete(Profile, { userId: user.id });
        await tm.delete(User, { id: user.id });
      });
    } catch (error) {
      throw error;
    }

    req.session.destroy((err) => {
      if (err) throw err;
    });
    res.clearCookie(SESSION_COOKIE_NAME);

    return null;
  }
}
