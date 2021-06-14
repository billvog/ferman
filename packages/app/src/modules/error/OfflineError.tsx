import React from "react";
import { View, Text } from "react-native";
import { colors, fontSize } from "../../constants/style";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";

interface OfflineErrorProps {}
export const OfflineError: React.FC<OfflineErrorProps> = ({}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.error,
          fontWeight: "600",
          fontSize: fontSize.paragraph,
        }}
      >
        {t("errors.offline")}
      </Text>
    </View>
  );
};
