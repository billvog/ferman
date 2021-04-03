import { Heading, Button } from "@chakra-ui/react";
import {
  CommentMax,
  CommentValidationSchema,
  COMMENT_TEXT_SHAPE,
} from "@ferman-pkgs/common";
import { CommentFormValues, ErrorMap } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import router from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";

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
        <Heading mb={2} fontSize={30} color="mainDarkBlue">
          {reply ? "Reply comment" : "Comment"}
        </Heading>
        <InputField
          label="Text"
          name="text"
          placeholder="Comment Text..."
          textarea
          maxLength={CommentMax}
        />
        <Button type="submit" mt={2} isLoading={isSubmitting}>
          {reply ? "Reply" : "Comment"}
        </Button>
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
