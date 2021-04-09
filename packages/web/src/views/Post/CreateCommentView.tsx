import { CommentMax, CommentValidationSchema } from "@ferman-pkgs/common";
import { CommentFormValues, ErrorMap } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../components/InputField";
import { Layout } from "../../components/Layout";
import { MyButton } from "../../components/MyButton";

interface CreateCommentViewProps {
  submit: (values: CommentFormValues) => Promise<ErrorMap | null>;
  reply: boolean;
}

export const C: React.FC<
  CreateCommentViewProps & FormikProps<CommentFormValues>
> = ({ isSubmitting, reply }) => {
  return (
    <Layout title="Create Comment – Ferman" isAuth>
      <Form>
        <h1>{reply ? "Reply comment" : "Comment"}</h1>
        <InputField
          label="Text"
          name="text"
          placeholder="Comment Text..."
          textarea
          maxLength={CommentMax}
        />
        <MyButton type="submit" isLoading={isSubmitting}>
          {reply ? "Reply" : "Comment"}
        </MyButton>
      </Form>
    </Layout>
  );
};

export const CreateCommentView = withFormik<
  CreateCommentViewProps,
  CommentFormValues
>({
  validationSchema: CommentValidationSchema,
  mapPropsToValues: () => ({
    text: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
