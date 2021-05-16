import { CommentMax, CommentValidationSchema } from "@ferman-pkgs/common";
import { CommentFormValues, ErrorMap } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../../../components/InputField";
import { MyButton } from "../../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";

interface CreateCommentViewProps {
  submit: (
    values: CommentFormValues
  ) => Promise<{
    commentId?: string;
    errors: ErrorMap | null;
  }>;
  reply: boolean;
  router: NextRouter;
}

export const C: React.FC<
  CreateCommentViewProps & FormikProps<CommentFormValues>
> = ({ isSubmitting, reply }) => {
  const { t } = useTypeSafeTranslation();
  return (
    <Form>
      <InputField
        label={t("common.body")}
        name="text"
        placeholder={`${t("common.body")}...`}
        type="text"
        textarea
        maxLength={CommentMax}
      />
      <MyButton type="submit" isLoading={isSubmitting}>
        {reply ? t("comment.reply") : t("comment.comment")}
      </MyButton>
    </Form>
  );
};

export const CreateCommentView = withRouter(
  withFormik<CreateCommentViewProps, CommentFormValues>({
    validateOnBlur: true,
    validationSchema: CommentValidationSchema,
    mapPropsToValues: () => ({
      text: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors, commentId } = await props.submit(values);
      if (errors) setErrors(errors);
      else
        props.router.replace(
          `/post/${props.router.query.postId}/comment/${commentId}`
        );
    },
  })(C)
);
