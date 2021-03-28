import React, { useState } from "react";
import { useForgotPasswordMutation } from "../generated/graphql";
import MyMessage from "../Types/MyMessage";

interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordControllerProps {
  children: (data: {
    submit: (values: ForgotPasswordFormValues) => Promise<any>;
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
        text: "Internal server error",
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
      text:
        "If a user exists with this email, an email has been sent with instructions.",
    });
  };

  return children({
    submit,
    message,
  });
};
