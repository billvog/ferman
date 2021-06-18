import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, Text } from "react-native";
import processString from "react-process-string";
import { colors, fontFamily } from "../constants/style";
import { AppParamList } from "../navigation/AppTabs/ParamList";
import { HomeParamList } from "../navigation/AppTabs/Stacks/Home/ParamList";

export const useRichBodyText = (body: string): any => {
  const navigation = useNavigation<StackNavigationProp<HomeParamList>>();

  const config = [
    {
      // TODO: make a hashtag controller, that shows all posts that have the hashtag
      regex: /(\#[a-zA-Z]+\b)(?!;)/gm,
      fn: (key: any, result: any) => (
        <Text
          key={key}
          style={styles.hashtagText}
          onPress={() =>
            navigation.push("SearchPosts", {
              query: result[0],
            })
          }
        >
          {result[0]}
        </Text>
      ),
    },
    {
      regex: /@([a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])/gi,
      fn: (key: any, result: any) => (
        <Text
          key={key}
          style={styles.mentionText}
          onPress={() =>
            navigation.push("UserProfile", {
              userUid: (result[0] as string).substr(1),
            })
          }
        >
          {result[0]}
        </Text>
      ),
    },
    {
      regex:
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm,
      fn: (key: any, result: any) => (
        <Text
          style={styles.linkText}
          key={key}
          onPress={() => WebBrowser.openBrowserAsync(result[0])}
        >
          {result[0]}
        </Text>
      ),
    },
  ];

  return <>{processString(config)(body)}</>;
};

const styles = StyleSheet.create({
  hashtagText: {
    fontFamily: fontFamily.inter.bold,
    color: colors.hashtag,
  },
  mentionText: {
    fontFamily: fontFamily.inter.bold,
    color: colors.accent,
  },
  linkText: {
    color: colors.info,
  },
});
