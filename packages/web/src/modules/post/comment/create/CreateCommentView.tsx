import { CommentMax, CommentValidationSchema } from "@ferman-pkgs/common";
import { CommentFormValues, ErrorMap } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import React from "react";
import { InputField } from "../../../../components/InputField";
import { MyButton } from "../../../../components/MyButton";
import { MyDialog } from "../../../../components/MyDialog";

interface CreateCommentViewProps {
  submit: (values: CommentFormValues) => Promise<ErrorMap | null>;
  reply: boolean;
}

export const C: React.FC<
  CreateCommentViewProps & FormikProps<CommentFormValues>
> = ({ isSubmitting, reply }) => {
  return (
    <Form>
      <InputField
        label="Text"
        name="text"
        placeholder="Text..."
        type="text"
        textarea
        maxLength={CommentMax}
      />
      <MyButton type="submit" isLoading={isSubmitting}>
        {reply ? "Reply" : "Comment"}
      </MyButton>
    </Form>
  );
};

export const CreateCommentView = withFormik<
  CreateCommentViewProps,
  CommentFormValues
>({
  validateOnBlur: true,
  validationSchema: CommentValidationSchema,
  mapPropsToValues: () => ({
    text: "",
  }),
  handleSubmit: async (values, { setErrors, props }) => {
    const errors = await props.submit(values);
    if (errors) setErrors(errors);
  },
})(C);
