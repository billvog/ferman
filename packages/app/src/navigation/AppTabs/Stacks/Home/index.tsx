import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "../../../../constants/style";
import { FeedController } from "../../../../modules/feed/FeedController";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";
import { headerOptions } from "../../../../styles/header";
import { CommonRoutes } from "../Common/CommonRoutes";
import { HomeNavProps, HomeParamList } from "./ParamList";

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack: React.FC = () => {
  const { t } = useTypeSafeTranslation();
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={headerOptions}>
      {CommonRoutes(Stack as any)}
      <Stack.Screen
        name="Feed"
        component={FeedController}
        options={({ navigation }: HomeNavProps<"Feed">) => ({
          headerTitle: t("index.feed"),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Explore");
              }}
              style={{
                marginRight: 14,
              }}
            >
              <Ionicons name="compass" size={24} color={colors.accentHover} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Explore"
        component={() => <FeedController isFeed={false} />}
        options={{
          headerTitle: t("explore.posts.title"),
        }}
      />
    </Stack.Navigator>
  );
};
