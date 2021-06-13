import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { AppParamList } from "./ParamList";
import { FeedStack } from "./Stacks/Feed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants/style";
import { ProfileStack } from "./Stacks/Profile";

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC = ({}) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName,
            Component: typeof Ionicons = Ionicons;

          switch (route.name) {
            case "Feed":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Profile":
              Component = MaterialCommunityIcons as any;
              iconName = focused ? "account" : "account-outline";
              break;
          }

          return <Component name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary800,
        inactiveTintColor: colors.primary450,
      }}
    >
      <Tabs.Screen name="Feed" component={FeedStack} />
      <Tabs.Screen name="Search" component={FeedStack} />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
};
