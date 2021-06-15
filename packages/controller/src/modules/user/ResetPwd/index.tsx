import React, { useState } from "react";
import { useResetPasswordMutation } from "../../../generated/graphql";
import { ErrorMap } from "../../../types/ErrorMap";
import { MyMessage } from "../../../types/MyMessage";

export interface ResetPasswordFormValues {
  password: string;
}

interface ResetPasswordControllerProps {
  token: string;
  children: (data: {
    submit: (values: ResetPasswordFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
    done: boolean;
  }) => JSX.Element | null;
}

export const ResetPasswordController: React.FC<ResetPasswordControllerProps> =
  ({ children, token }) => {
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState<MyMessage | null>(null);
    const [resetPassword] = useResetPasswordMutation();

    const submit = async (values: ResetPasswordFormValues) => {
      const { data } = await resetPassword({
        variables: {
          password: values.password,
          token,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return null;
      }

      if (data.resetPassword) {
        setMessage({
          type: "error",
          text: data.resetPassword.message,
        });
        return null;
      }

      setDone(true);
      return null;
    };

    return children({
      submit,
      message,
      done,
    });
  };
