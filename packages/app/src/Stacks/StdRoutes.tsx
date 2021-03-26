import React from "react";
import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { CreateComment } from "../Screens/CreateComment";
import { CreatePost } from "../Screens/CreatePost";
import { ViewComment } from "../Screens/ViewComment";
import { ViewPost } from "../Screens/ViewPost";
import { ViewUser } from "../Screens/ViewUser";
import { FeedParamList } from "../Types/FeedParamList";
import { SearchParamList } from "../Types/SearchParamList";
import { MyAccountParamList } from "../Types/MyAccountParamList";
import { ViewFollowers } from "../Screens/ViewFollowers";
import { ViewFollows } from "../Screens/ViewFollows";

export const StdRoutes = (
  Stack: TypedNavigator<
    FeedParamList | SearchParamList | MyAccountParamList,
    StackNavigationState<Record<string, object | undefined>>,
    StackNavigationOptions,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen name="User" component={ViewUser} />
      <Stack.Screen name="Followers" component={ViewFollowers} />
      <Stack.Screen name="Following" component={ViewFollows} />
      <Stack.Screen name="Post" component={ViewPost} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ headerTitle: "Create Post" }}
      />
      <Stack.Screen name="Comment" component={ViewComment} />
      <Stack.Screen
        name="CreateComment"
        component={CreateComment}
        options={({ route }) => ({
          headerTitle: route.params.reply ? "Reply" : "Comment",
        })}
      />
    </>
  );
};
