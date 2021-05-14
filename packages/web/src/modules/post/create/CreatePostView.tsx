import { BodyMax, PostValidationSchema } from "@ferman-pkgs/common";
import { ErrorMap, MyMessage, PostFormValues } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";

interface CreatePostViewProps {
  submit: (
    values: PostFormValues
  ) => Promise<{
    postId?: string;
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreatePostViewProps & FormikProps<PostFormValues>> = ({
  message,
  isSubmitting,
}) => {
  return (
    <Form>
      {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
      <InputField
        textarea
        label="Body"
        name="body"
        placeholder="Text..."
        type="text"
        maxLength={BodyMax}
      />
      <MyButton type="submit" isLoading={isSubmitting}>
        Post
      </MyButton>
    </Form>
  );
};

export const CreatePostView = withRouter(
  withFormik<CreatePostViewProps, PostFormValues>({
    validateOnBlur: true,
    validationSchema: PostValidationSchema,
    mapPropsToValues: () => ({
      body: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors, postId } = await props.submit(values);
      if (errors) setErrors(errors);
      else props.router.replace(`/post/${postId}`);
    },
  })(C)
);