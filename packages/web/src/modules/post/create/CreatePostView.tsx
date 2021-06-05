import { BodyMax, PostValidationSchema } from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  CreatePostFormValues,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreatePostViewProps {
  submit: (values: CreatePostFormValues) => Promise<{
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreatePostViewProps & FormikProps<CreatePostFormValues>> = ({
  message,
  isSubmitting,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Form>
      {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
      <div className="mb-3">
        <InputField
          textarea
          label={t("common.body")}
          name="body"
          placeholder={`${t("common.body")}...`}
          type="text"
          maxLength={BodyMax}
        />
      </div>
      <MyButton type="submit" isLoading={isSubmitting}>
        {t("post.post")}
      </MyButton>
    </Form>
  );
};

export const CreatePostView = withRouter(
  withFormik<CreatePostViewProps, CreatePostFormValues>({
    validateOnBlur: true,
    validationSchema: PostValidationSchema,
    mapPropsToValues: () => ({
      body: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors } = await props.submit(values);
      if (errors) setErrors(errors);
    },
  })(C)
);
