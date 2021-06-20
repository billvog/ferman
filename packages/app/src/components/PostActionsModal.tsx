import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../constants/style";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { actionModalStyles as styles } from "../styles/actionModalStyles";

interface PostActionsModalProps {
  isMine: boolean;
  isModalOpen: boolean;
  closeModal: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export const PostActionsModal: React.FC<PostActionsModalProps> = ({
  isMine,
  isModalOpen,
  closeModal,
  onShare,
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
            closeModal();
            onShare();
          }}
        >
          <View style={styles.actionItemIcon}>
            <Feather name="share" size={14} color={colors.primary500} />
          </View>
          <Text style={[styles.actionItemText, { color: colors.primary500 }]}>
            {t("post.share")}
          </Text>
        </TouchableOpacity>
        {isMine && (
          <TouchableOpacity
            style={[styles.actionItem, styles.actionItemNotFirst]}
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
        )}
      </View>
    </Modal>
  );
};
