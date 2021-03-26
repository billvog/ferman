import { Formik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { InputField } from "../Components/InputField";
import { Layout } from "../Components/Layout";
import {
  MeDocument,
  MeQuery,
  useFinishRegisterMutation,
  useRegisterMutation,
  useValidateRegisterTokenMutation,
} from "../generated/graphql";
import { FormStyles } from "../Styles/Form";
import { AuthNavProps } from "../Types/AuthParamList";
import { MyDatepicker } from "../Components/MyDatepicker";

export const Register = ({ navigation }: AuthNavProps<"Register">) => {
  const [register] = useRegisterMutation();
  const [validateToken] = useValidateRegisterTokenMutation();
  const [finishRegister] = useFinishRegisterMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.finishRegister.user,
        },
      });
    },
  });

  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [done, setDone] = useState(false);

  return (
    <Layout container>
      <Formik
        initialValues={{
          uid: "",
          username: "",
          email: "",
          birthdate: "",
          code: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          if (phase === 0) {
            const { data } = await register({
              variables: {
                options: {
                  uid: values.uid,
                  username: values.username,
                  email: values.email,
                  birthdate: values.birthdate,
                },
              },
            });

            if (!data) {
              return Alert.alert("Failed", "Internal server error");
            }

            if (data?.register) {
              return setErrors({
                [data.register.field]: data.register.message,
              });
            }

            setPhase(1);
            return Alert.alert(
              "Proceed",
              "An email has been sent to the email address you've given. There, are instructions on how to continue setting up your account."
            );
          } else if (phase === 1) {
            const { data } = await validateToken({
              variables: {
                token: values.code,
              },
            });

            if (!data?.validateRegisterToken) {
              return Alert.alert("Failed", "Invalid token provided");
            }

            return setPhase(2);
          } else if (phase === 2) {
            const { data } = await finishRegister({
              variables: {
                password: values.password,
                token: values.code,
                options: {
                  uid: values.uid,
                  username: values.username,
                  email: values.email,
                  birthdate: values.birthdate,
                },
              },
            });

            if (!data) {
              return Alert.alert("Failed", "Internal server error");
            }

            if (data?.finishRegister.error) {
              return setErrors({
                [data.finishRegister.error.field]:
                  data.finishRegister.error.message,
              });
            }

            setDone(true);
          }
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            {phase === 0 ? (
              <>
                <InputField
                  label="User Id"
                  placeholder="Enter uid"
                  onChangeText={handleChange("uid")}
                  value={values.uid}
                  error={errors.uid}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  helperText="How others will search you. Choose it carefully, because you won't have the abillity to change it after is set."
                />
                <InputField
                  label="Username"
                  placeholder="Enter username"
                  onChangeText={handleChange("username")}
                  value={values.username}
                  error={errors.username}
                  autoCompleteType="name"
                  helperText="Your real name, will be displayed in your profile."
                />
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
                <MyDatepicker
                  label="Date of Birth"
                  value={new Date(values.birthdate || 0)}
                  error={errors.birthdate}
                  onChange={(e, date) => setFieldValue("birthdate", date)}
                  helperText="This won't be visible to the public."
                />
                <TouchableOpacity
                  onPress={handleSubmit as any}
                  style={FormStyles.PrimaryButton}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={FormStyles.PrimaryButtonText}>Continue</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : phase === 1 ? (
              <>
                <InputField
                  label="Verification Code"
                  placeholder="Enter code"
                  onChangeText={handleChange("code")}
                  value={values.code}
                  error={errors.code}
                  autoCapitalize="none"
                  autoCompleteType="off"
                />
                <TouchableOpacity
                  onPress={handleSubmit as any}
                  style={FormStyles.PrimaryButton}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={FormStyles.PrimaryButtonText}>Continue</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : phase === 2 ? (
              <>
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
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={FormStyles.PrimaryButtonText}>Finish</Text>
                  )}
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        )}
      </Formik>
    </Layout>
  );
};
