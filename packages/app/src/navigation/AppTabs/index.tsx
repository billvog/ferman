import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useContext } from "react";
import { colors } from "../../constants/style";
import { AuthContext } from "../../modules/auth/AuthProvider";
import { AppParamList } from "./ParamList";
import { ChatStack } from "./Stacks/Chat";
import { CreatePostScreen } from "./Stacks/CreatePost";
import { HomeStack } from "./Stacks/Home";
import { ProfileStack } from "./Stacks/Profile";
import { SearchStack } from "./Stacks/Search";

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC = ({}) => {
  const { me } = useContext(AuthContext);

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
            case "Chat":
              Component = Ionicons as any;
              iconName = focused
                ? "ios-chatbubble-ellipses"
                : "ios-chatbubble-ellipses-outline";
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
      <Tabs.Screen
        name="Chat"
        component={ChatStack}
        options={{
          tabBarBadge: me?.hasUnreadMessage ? 1 : undefined,
          tabBarBadgeStyle: {
            fontSize: 10,
            fontWeight: "700",
            backgroundColor: colors.warning,
            color: colors.primary600,
          },
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileStack} />
    </Tabs.Navigator>
  );
};
