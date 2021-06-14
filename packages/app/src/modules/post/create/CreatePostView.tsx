import { PostValidationSchema } from "@ferman-pkgs/common";
import {
  CreatePostFormValues,
  ErrorMap,
  FullPostFragment,
  MyMessage,
} from "@ferman-pkgs/controller";
import { useNavigation } from "@react-navigation/native";
import { Field, FormikProps, withFormik } from "formik";
import i18n from "i18next";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreatePostViewProps {
  isReply: boolean;
  parentPost?: FullPostFragment | null | undefined;
  submit: (values: CreatePostFormValues) => Promise<{
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
}

const C: React.FC<CreatePostViewProps & FormikProps<CreatePostFormValues>> = ({
  isReply,
  parentPost,
  message,
  isSubmitting,
  submitForm,
}) => {
  const { t } = useTypeSafeTranslation();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (isReply === true) {
      navigation.setOptions({
        headerTitle: t("post.reply"),
      });
    }
  }, [isReply]);

  return (
    <View
      style={{
        marginHorizontal: 12,
        marginVertical: 14,
      }}
    >
      {!!message && i18n.exists(message.text) && (
        <View
          style={{
            marginBottom: 12,
          }}
        >
          <MyAlert color={message.type}>{t(message.text as any)}</MyAlert>
        </View>
      )}
      <View
        style={{
          marginBottom: 12,
        }}
      >
        <Field
          name="body"
          placeholder={`${t("common.body")}...`}
          multiline={true}
          component={InputField}
        />
      </View>
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <MyButton
          title={isReply ? t("post.reply") : t("post.post")}
          style="secondary"
          isLoading={isSubmitting}
          onPress={submitForm}
        />
      </View>
    </View>
  );
};

export const CreatePostView = withFormik<
  CreatePostViewProps,
  CreatePostFormValues
>({
  validationSchema: PostValidationSchema,
  mapPropsToValues: () => ({
    body: "",
  }),
  handleSubmit: async (values, { setErrors, props, resetForm }) => {
    const { errors } = await props.submit(values);
    if (errors) setErrors(errors);
    else resetForm();
  },
})(C);
