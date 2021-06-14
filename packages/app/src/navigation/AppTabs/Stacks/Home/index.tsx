import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FeedController } from "../../../../modules/feed/FeedController";
import { PostController } from "../../../../modules/post/PostController";
import { HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedController} />
      <Stack.Screen
        name="ViewPost"
        component={PostController}
        options={{
          headerTitle: "Post",
        }}
      />
    </Stack.Navigator>
  );
};
