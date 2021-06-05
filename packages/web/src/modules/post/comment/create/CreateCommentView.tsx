import { CommentMax, CommentValidationSchema } from "@ferman-pkgs/common";
import { CreateCommentFormValues, ErrorMap } from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../../../components/InputField";
import { MyButton } from "../../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../../shared-hooks/useTypeSafeTranslation";

interface CreateCommentViewProps {
  submit: (values: CreateCommentFormValues) => Promise<{
    errors: ErrorMap | null;
  }>;
  reply: boolean;
  router: NextRouter;
}

export const C: React.FC<
  CreateCommentViewProps & FormikProps<CreateCommentFormValues>
> = ({ isSubmitting, reply }) => {
  const { t } = useTypeSafeTranslation();
  return (
    <Form>
      <div className="mb-3">
        <InputField
          label={t("common.body")}
          name="text"
          placeholder={`${t("common.body")}...`}
          type="text"
          textarea
          maxLength={CommentMax}
        />
      </div>
      <MyButton type="submit" isLoading={isSubmitting}>
        {reply ? t("comment.reply") : t("comment.comment")}
      </MyButton>
    </Form>
  );
};

export const CreateCommentView = withRouter(
  withFormik<CreateCommentViewProps, CreateCommentFormValues>({
    validateOnBlur: true,
    validationSchema: CommentValidationSchema,
    mapPropsToValues: () => ({
      text: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors } = await props.submit(values);
      if (errors) setErrors(errors);
    },
  })(C)
);
