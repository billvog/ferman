import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { LoginFormValues, ErrorMap, MyMessage } from "@ferman-pkgs/controller";
import { FormikProps, withFormik, Field } from "formik";
import { LoginValidationSchema } from "@ferman-pkgs/common";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";

interface LoginViewProps {
  submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
  message: MyMessage | null;
}

const C: React.FC<LoginViewProps & FormikProps<LoginFormValues>> = ({
  message,
  isSubmitting,
  submitForm,
}) => {
  return (
    <SafeAreaView
      style={{
        marginHorizontal: 10,
        marginVertical: 12,
      }}
    >
      {!!message && (
        <View
          style={{
            marginBottom: 12,
          }}
        >
          <MyAlert color={message.type}>{message.text}</MyAlert>
        </View>
      )}
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Field
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCompleteType="email"
          component={InputField}
        />
      </View>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Field
          name="password"
          secureTextEntry={true}
          placeholder="Password"
          component={InputField}
        />
      </View>
      <View>
        <Button title="Login" onPress={submitForm} />
      </View>
    </SafeAreaView>
  );
};

export const LoginView = withFormik<LoginViewProps, LoginFormValues>({
  validationSchema: LoginValidationSchema,
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
