import { UidMax } from "@ferman-pkgs/common";
import {
  CreateChatFormValues,
  ErrorMap,
  MyMessage,
} from "@ferman-pkgs/controller";
import { Form, FormikProps, withFormik } from "formik";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { MyAlert } from "../../../components/MyAlert";
import { MyButton } from "../../../components/MyButton";
import { useTypeSafeTranslation } from "../../../shared-hooks/useTypeSafeTranslation";

interface CreateChatViewProps {
  submit: (values: CreateChatFormValues) => Promise<{
    chatId?: number;
    errors: ErrorMap | null;
  }>;
  message: MyMessage | null;
  router: NextRouter;
}

const C: React.FC<CreateChatViewProps & FormikProps<CreateChatFormValues>> = ({
  message,
  isSubmitting,
}) => {
  const { t } = useTypeSafeTranslation();

  return (
    <Form>
      {message && <MyAlert color={message.type}>{message.text}</MyAlert>}
      <InputField
        label={t("chat.create_chat.label.reciever")}
        name="reciever"
        placeholder={t("chat.create_chat.placeholder.reciever")}
        type="text"
        maxLength={UidMax}
      />
      <MyButton type="submit" isLoading={isSubmitting}>
        {t("chat.new_chat")}
      </MyButton>
    </Form>
  );
};

export const CreateChatView = withRouter(
  withFormik<CreateChatViewProps, CreateChatFormValues>({
    // validateOnBlur: true,
    // validationSchema: PostValidationSchema,
    mapPropsToValues: () => ({
      reciever: "",
    }),
    handleSubmit: async (values, { setErrors, props }) => {
      const { errors, chatId } = await props.submit(values);
      if (errors) setErrors(errors);
      else props.router.replace(`/chat/${chatId}`);
    },
  })(C)
);
