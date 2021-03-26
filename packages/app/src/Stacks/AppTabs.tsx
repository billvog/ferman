import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { AppParamList } from "../Types/AppParamList";
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { FeedStack } from "./Feed";
import { NavigationContainer } from "@react-navigation/native";
import { MyAccountStack } from "./MyAccount";
import { SearchStack } from "./Search";
import { CreatePost } from "../Screens/CreatePost";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "Feed":
                return (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "Search":
                return (
                  <Ionicons
                    name={focused ? "search" : "search-outline"}
                    size={size}
                    color={color}
                  />
                );
              case "MyAccount":
                return (
                  <FontAwesome
                    name={focused ? "user-circle" : "user-circle-o"}
                    size={size}
                    color={color}
                  />
                );
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: "brown",
          inactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen name="Feed" component={FeedStack} />
        <Tabs.Screen name="Search" component={SearchStack} />
        <Tabs.Screen
          name="MyAccount"
          options={{
            title: "My Account",
          }}
          component={MyAccountStack}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
