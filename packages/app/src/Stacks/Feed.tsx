import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feed } from "../Screens/Feed";
import { HeaderOptions, HeaderStyles } from "../Styles/Header";
import { FeedNavProps, FeedParamList } from "../Types/FeedParamList";
import { StdRoutes } from "./StdRoutes";

const Stack = createStackNavigator<FeedParamList>();

export const FeedStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }: FeedNavProps<"Feed">) => ({
          headerRight: () => (
            <View style={HeaderStyles.HeaderContainer}>
              <TouchableOpacity
                style={HeaderStyles.HeaderButton}
                onPress={() => navigation.navigate("CreatePost")}
              >
                <Text style={HeaderStyles.HeaderButtonText}>
                  <AntDesign name="plus" />
                </Text>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      {StdRoutes(Stack as any)}
    </Stack.Navigator>
  );
};
