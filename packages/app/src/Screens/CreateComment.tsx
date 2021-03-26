import { Formik } from "formik";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputField } from "../Components/InputField";
import { Layout } from "../Components/Layout";
import { useCommentPostMutation } from "../generated/graphql";
import { FormStyles } from "../Styles/Form";
import { FeedNavProps } from "../Types/FeedParamList";

export const CreateComment = ({
  route,
  navigation,
}: FeedNavProps<"CreateComment">) => {
  const [createComment] = useCommentPostMutation();

  return (
    <Layout container>
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { data } = await createComment({
            variables: {
              id: route.params.postId,
              parentId: route.params.reply ? route.params.parentId : null,
              options: values,
            },
            update: (cache) => {
              cache.evict({ fieldName: "comments" });
              cache.evict({ fieldName: "viewComment" });
              cache.evict({ id: "Post:" + route.params.postId });
            },
          });

          if (!data) {
            return Alert.alert("Failed", "Internal server error");
          }

          if (data?.createComment.error) {
            return setErrors({
              [data.createComment.error.field]:
                data.createComment.error.message,
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
              label="Text"
              onChangeText={handleChange("text")}
              value={values.text}
              placeholder="Text..."
              multiline={true}
              numberOfLines={3}
              textAlignVertical="top"
              error={errors.text}
            />
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={[FormStyles.PrimaryButton, { marginTop: 5 }]}
            >
              <Text style={FormStyles.PrimaryButtonText}>
                {route.params.reply ? "Reply" : "Comment"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </Layout>
  );
};
