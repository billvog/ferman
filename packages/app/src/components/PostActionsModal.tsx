import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../constants/style";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { actionModalStyles } from "../styles/actionModalStyles";

interface PostActionsModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

export const PostActionsModal: React.FC<PostActionsModalProps> = ({
  isModalOpen,
  closeModal,
  onDelete,
}) => {
  const { t } = useTypeSafeTranslation();
  return (
    <Modal
      isVisible={isModalOpen}
      onBackdropPress={closeModal}
      swipeDirection={["down"]}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
    >
      <View style={actionModalStyles.container}>
        <TouchableOpacity
          style={actionModalStyles.actionItem}
          onPress={() => {
            Alert.alert(
              t("post.delete_dialog.title"),
              t("post.delete_dialog.text"),
              [
                {
                  text: t("button.cancel"),
                  style: "cancel",
                },
                {
                  text: t("button.delete"),
                  style: "destructive",
                  onPress: () => {
                    closeModal();
                    onDelete();
                  },
                },
              ]
            );
          }}
        >
          <View style={actionModalStyles.actionItemIcon}>
            <FontAwesome5 name="trash-alt" size={14} color={colors.error} />
          </View>
          <Text
            style={[actionModalStyles.actionItemText, { color: colors.error }]}
          >
            {t("button.delete")}...
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
