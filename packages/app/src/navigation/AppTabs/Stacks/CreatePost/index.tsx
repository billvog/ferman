import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { CreatePostConnector } from "../../../../modules/post/create/CreatePostConnector";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { CreatePostParamList } from "./ParamList";

const Stack = createStackNavigator<CreatePostParamList>();
export const CreatePostScreen: React.FC = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="CreatePost"
        options={{
          headerTitle: t("post.post"),
        }}
        component={CreatePostConnector}
      />
    </Stack.Navigator>
  );
};
