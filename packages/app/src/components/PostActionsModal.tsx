import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors, paragraphBold } from "../constants/style";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";

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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionItem}
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
          <View style={styles.actionItemIcon}>
            <FontAwesome5 name="trash-alt" size={14} color={colors.error} />
          </View>
          <Text style={[styles.actionItemText, { color: colors.error }]}>
            {t("button.delete")}...
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 18,
  },
  actionItem: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  actionItemIcon: {
    marginRight: 12,
  },
  actionItemText: {
    ...paragraphBold,
  },
});
