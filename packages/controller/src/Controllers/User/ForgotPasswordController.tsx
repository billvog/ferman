import React, { useState } from "react";
import { ErrorMap } from "../../Types/ErrorMap";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { MyMessage } from "../../Types/MyMessage";

export interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordControllerProps {
  children: (data: {
    submit: (values: ForgotPasswordFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const ForgotPasswordController: React.FC<ForgotPasswordControllerProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [forgotPassword] = useForgotPasswordMutation();

  const submit = async (values: ForgotPasswordFormValues) => {
    const { data } = await forgotPassword({
      variables: values,
    });

    if (!data) {
      setMessage({
        type: "error",
        text: "errors.500",
      });
      return null;
    }

    if (data.forgotPassword) {
      return {
        [data.forgotPassword.field]: data.forgotPassword.message,
      };
    }

    setMessage({
      type: "success",
      text: "forgot_pwd.message.success",
    });
    return null;
  };

  return children({
    submit,
    message,
  });
};
