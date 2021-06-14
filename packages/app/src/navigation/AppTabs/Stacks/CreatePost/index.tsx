import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreatePostConnector } from "../../../../modules/post/create/CreatePostConnector";
import { CreatePostParamList } from "./ParamList";

const Stack = createStackNavigator<CreatePostParamList>();
export const CreatePostScreen: React.FC = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreatePost"
        options={{
          headerTitle: "Post",
        }}
        component={CreatePostConnector}
      />
    </Stack.Navigator>
  );
};
