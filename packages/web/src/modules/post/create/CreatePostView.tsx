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
import React from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { MySpinner } from "../../../components/MySpinner";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreatePostViewProps {
  parentPost?: FullPostFragment | null | undefined;
  submit: (values: CreatePostFormValues) => Promise<{
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreatePostViewProps & FormikProps<CreatePostFormValues>> = ({
  parentPost,
  message,
  isSubmitting,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Form>
      {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
      {parentPost == undefined ? (
        <div className="max-w-min mt-3.5">
          <MySpinner size="tiny" />
        </div>
      ) : !!parentPost ? (
        <div className="mt-2">
          <div className="text-sm text-primary-600">
            Reply to{" "}
            <Link href={`/user/${parentPost.creator.uid}`}>
              <span className="font-bold cursor-pointer hover:underline">
                @{parentPost.creator.uid}
              </span>
            </Link>
          </div>
        </div>
      ) : null}
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
