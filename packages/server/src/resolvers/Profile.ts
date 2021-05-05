import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Profile } from "../entity/Profile";
import { User } from "../entity/User";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../MyContext";
import { UpdateProfileValidationSchema } from "@ferman-pkgs/common";
import { FieldError } from "./FieldError";
import fetch from "node-fetch";
import { createHash } from "crypto";

@ObjectType()
class ProfileResponse {
  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class ProfileInput {
  @Field()
  username: string;
  @Field()
  bio: string;
  @Field()
  location: string;
  @Field()
  showBirthdate: boolean;
}

@Resolver(Profile)
export class ProfileResolver {
  // PROTECT BIRTHDATE
  @FieldResolver(() => String)
  birthdate(@Root() profile: Profile, @Ctx() { req }: MyContext) {
    if (req.session.userId === profile.userId || profile.showBirthdate) {
      return profile.birthdate;
    }

    return "";
  }

  // AVATAR URL
  @FieldResolver(() => String)
  async avatarUrl(@Root() profile: Profile) {
    const user = await User.findOne(profile.userId);
    if (!user) return "";

    const md5 = createHash("md5").update(user.email).digest("hex");

    const request = await fetch(`https://en.gravatar.com/${md5}.json`);
    const response = await request.json();

    if (
      !!response.entry &&
      response.entry[0].thumbnailUrl &&
      response.entry[0].preferredUsername !== "undefined"
    ) {
      return response.entry[0].thumbnailUrl as string;
    } else {
      return `https://eu.ui-avatars.com/api?name=${encodeURI(
        user.username
      )}&background=random`;
    }
  }

  // BANNER URL
  @FieldResolver(() => String)
  async bannerUrl(@Root() profile: Profile) {
    const user = await User.findOne(profile.userId);
    if (!user) return "";

    const md5 = createHash("md5").update(user.email).digest("hex");

    const request = await fetch(`https://en.gravatar.com/${md5}.json`);
    const response = await request.json();
    if (!!response.entry && response.entry[0].profileBackground) {
      return (response.entry[0].profileBackground?.url ||
        response.entry[0].profileBackground?.color) as string;
    } else {
      return "https://source.unsplash.com/random";
    }
  }

  // UPDATE PROFILE
  @Mutation(() => ProfileResponse)
  @UseMiddleware(isAuth)
  async updateProfile(
    @Arg("options", () => ProfileInput) options: ProfileInput,
    @Ctx() { req }: MyContext
  ): Promise<ProfileResponse> {
    // find user
    const user = await User.findOne(req.session.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // find profile
    const profile = await Profile.findOne({
      where: { userId: req.session.userId },
    });

    if (!profile) {
      throw new Error("Profile not found");
    }

    // validate
    try {
      const validation = await UpdateProfileValidationSchema.validate(options);
      options = {
        username: validation.username!,
        bio: validation.bio!,
        location: validation.location!,
        showBirthdate: validation.showBirthdate!,
      };
    } catch (error) {
      return {
        error: {
          field: error.path,
          message: error.errors[0],
        },
      };
    }

    if (
      user.username !== options.username &&
      (await User.findOne({ where: { username: options.username } }))
    ) {
      return {
        error: {
          field: "username",
          message: "Username already taken",
        },
      };
    }

    user.username = options.username;
    await user.save();

    profile.bio = options.bio;
    profile.location = options.location;
    profile.showBirthdate = options.showBirthdate;
    await profile.save();

    return {
      user,
    };
  }
}
