import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, Text } from "react-native";
import processString from "react-process-string";
import { colors, fontFamily } from "../constants/style";

export const useRichBodyText = (body: string): any => {
  const navigation = useNavigation();
  const config = [
    {
      regex: /(\#[a-zA-Z]+\b)(?!;)/gm,
      fn: (key: any, result: any) => (
        <Text key={key} style={styles.hashtagText}>
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
            navigation.navigate("UserProfile", {
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
