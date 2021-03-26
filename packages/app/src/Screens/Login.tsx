import { Formik } from "formik";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { InputField } from "../Components/InputField";
import { Layout } from "../Components/Layout";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { FormStyles } from "../Styles/Form";
import { AuthNavProps } from "../Types/AuthParamList";

export const Login = ({ navigation }: AuthNavProps<"Login">) => {
  const [login] = useLoginMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.login.user,
        },
      });
    },
  });

  return (
    <Layout container>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await login({
            variables: {
              options: values,
            },
          });

          if (!data) {
            return Alert.alert("Failed", "Internal server error");
          }

          if (data?.login.error) {
            return setErrors({
              [data.login.error.field]: data.login.error.message,
            });
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <InputField
              label="Email"
              placeholder="Enter email"
              onChangeText={handleChange("email")}
              value={values.email}
              error={errors.email}
              autoCapitalize="none"
              autoCompleteType="email"
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              onChangeText={handleChange("password")}
              value={values.password}
              error={errors.password}
              autoCompleteType="password"
              secureTextEntry
            />
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={FormStyles.PrimaryButton}
            >
              <Text style={FormStyles.PrimaryButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={FormStyles.FooterText}>
                Don't have an account?{" "}
                <Text style={{ fontWeight: "600" }}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
