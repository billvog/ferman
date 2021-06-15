import React, { useState } from "react";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
} from "../../../generated/graphql";
import { ErrorMap } from "../../../types/ErrorMap";
import { MyMessage } from "../../../types/MyMessage";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: LoginFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
  }) => JSX.Element | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
  onFinish,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [login] = useLoginMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.login.user,
        },
      });
    },
  });

  const submit = async (values: LoginFormValues) => {
    const { data } = await login({
      variables: {
        options: values,
      },
    });

    if (!data) {
      setMessage({
        type: "error",
        text: "errors.500",
      });
      return null;
    }

    if (data?.login.error) {
      setMessage({
        type: "error",
        text: `form.error.${data.login.error.message}`,
      });
      return null;
    }

    setMessage(null);

    onFinish();
    return null;
  };

  return children({
    submit,
    message,
  });
};
