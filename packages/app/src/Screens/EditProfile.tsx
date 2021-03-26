import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import { Toast, View } from "native-base";
import React from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ErrorText } from "../Components/ErrorText";
import { InputField } from "../Components/InputField";
import { Layout } from "../Components/Layout";
import { MyCheckbox } from "../Components/MyCheckbox";
import { useMeQuery, useUpdateProfileMutation } from "../generated/graphql";
import { FormStyles } from "../Styles/Form";
import { DefaultToastStyles } from "../Styles/Toast";
import { MyAccountNavProps } from "../Types/MyAccountParamList";

export const EditProfile = ({
  navigation,
}: MyAccountNavProps<"EditProfile">) => {
  const { data: meData, loading: meLoading } = useMeQuery();
  const [updateProfile] = useUpdateProfileMutation();

  return (
    <Layout container>
      {meLoading ? (
        <ActivityIndicator color="grey" />
      ) : !meData || !meData.me ? (
        <ErrorText>Internal server error</ErrorText>
      ) : (
        <Formik
          initialValues={{
            username: meData.me.username,
            bio: meData.me.profile!.bio,
            location: meData.me.profile!.location,
            showBirthdate: meData.me.profile!.showBirthdate,
          }}
          onSubmit={async (values, { setErrors }) => {
            const { data } = await updateProfile({
              variables: {
                options: values,
              },
              update: (cache) => {
                cache.evict({ fieldName: "posts" });
              },
            });

            if (!data) {
              return Alert.alert("Failed", "Internal server error");
            }

            if (data?.updateProfile.error) {
              return setErrors({
                [data.updateProfile.error.field]:
                  data.updateProfile.error.message,
              });
            }

            Toast.show({
              ...DefaultToastStyles,
              text: "Profile upated",
              buttonText: "Close",
              type: "success",
            });

            navigation.goBack();
          }}
        >
          {({
            values,
            errors,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => (
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <InputField
                label="Username"
                placeholder="Username"
                onChangeText={handleChange("username")}
                value={values.username}
                error={errors.username}
                helperText="Your display name"
              />
              <InputField
                label="Bio"
                placeholder="Text..."
                onChangeText={handleChange("bio")}
                value={values.bio}
                error={errors.bio}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                helperText="Few words about you"
              />
              <InputField
                label="Location"
                placeholder="Location"
                onChangeText={handleChange("location")}
                value={values.location}
                error={errors.location}
              />
              <View style={{ marginVertical: 5 }}>
                <MyCheckbox
                  label="Show Birthday (to everyone)"
                  color="peru"
                  checked={values.showBirthdate}
                  onPress={() =>
                    setFieldValue("showBirthdate", !values.showBirthdate)
                  }
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit as any}
                style={[FormStyles.PrimaryButton, { marginTop: 5 }]}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={FormStyles.PrimaryButtonText}>
                    Apply <Entypo name="check" />
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
    </Layout>
  );
};
