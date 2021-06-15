import React from "react";
import { KeyboardAvoidingView } from "react-native";

export const FormContainer: React.FC = ({ children }) => {
  return (
    <KeyboardAvoidingView
      style={{
        marginHorizontal: 12,
        marginVertical: 14,
        flex: 1,
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
