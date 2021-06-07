import { BodyMax, PostValidationSchema } from "@ferman-pkgs/common";
import {
  ErrorMap,
  MyMessage,
  CreatePostFormValues,
  FullPostFragment,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreatePostViewProps {
  setModalTitle: (t: JSX.Element) => void;
  parentPost?: FullPostFragment | null | undefined;
  submit: (values: CreatePostFormValues) => Promise<{
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreatePostViewProps & FormikProps<CreatePostFormValues>> = ({
  setModalTitle,
  parentPost,
  message,
  isSubmitting,
}) => {
  const { t } = useTypeSafeTranslation();

  useEffect(() => {
    if (parentPost) {
      setModalTitle(
        <div className="select-none">
          <span className="text-primary-600 mr-1">{t("post.reply_to")}</span>
          <Link href={`/user/${parentPost.creator.uid}`}>
            <span className="group text-accent-washed-out cursor-pointer">
              @
              <span className="group-hover:underline">
                {parentPost.creator.uid}
              </span>
            </span>
          </Link>
        </div>
      );
    }
  }, [parentPost]);

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
