import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { colors } from "../../constants/style";
import { AppParamList } from "./ParamList";
import { CreatePostScreen } from "./Stacks/CreatePost";
import { HomeStack } from "./Stacks/Home";
import { ProfileStack } from "./Stacks/Profile";
import { SearchStack } from "./Stacks/Search";

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName,
            Component: typeof Ionicons = Ionicons;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "CreatePost":
              Component = AntDesign as any;
              iconName = focused ? "pluscircle" : "pluscircleo";
              break;
            case "Profile":
              Component = MaterialCommunityIcons as any;
              iconName = focused ? "account" : "account-outline";
              break;
          }

          return <Component name={iconName as any} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary800,
        inactiveTintColor: colors.primary450,
        showLabel: false,
      }}
    >
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Search" component={SearchStack} />
      <Tabs.Screen name="CreatePost" component={CreatePostScreen} />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
};
