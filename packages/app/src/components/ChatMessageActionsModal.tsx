import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../constants/style";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import { actionModalStyles } from "../styles/actionModalStyles";

interface ChatMessageActionsModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

export const ChatMessageActionsModal: React.FC<ChatMessageActionsModalProps> =
  ({ isModalOpen, closeModal, onDelete }) => {
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
              closeModal();
              onDelete();
            }}
          >
            <View style={actionModalStyles.actionItemIcon}>
              <FontAwesome5 name="trash-alt" size={14} color={colors.error} />
            </View>
            <Text
              style={[
                actionModalStyles.actionItemText,
                { color: colors.error },
              ]}
            >
              {t("button.delete")}...
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
