import { Formik } from "formik";
import { View } from "native-base";
import React from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { InputField } from "../Components/InputField";
import { Layout } from "../Components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { FormStyles } from "../Styles/Form";
import { FeedNavProps } from "../Types/FeedParamList";

export const CreatePost = ({ navigation }: FeedNavProps<"CreatePost">) => {
  const [createPost] = useCreatePostMutation();

  return (
    <Layout container>
      <SafeAreaView />
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await createPost({
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

          if (data?.createPost.error) {
            return setErrors({
              [data.createPost.error.field]: data.createPost.error.message,
            });
          }

          navigation.goBack();
        }}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <InputField
              label="Title"
              onChangeText={handleChange("title")}
              value={values.title}
              placeholder="Title"
              error={errors.title}
            />
            <InputField
              label="Body"
              onChangeText={handleChange("body")}
              value={values.body}
              placeholder="Text..."
              error={errors.body}
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
            />
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={[FormStyles.PrimaryButton, { marginTop: 5 }]}
            >
              <Text style={FormStyles.PrimaryButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
