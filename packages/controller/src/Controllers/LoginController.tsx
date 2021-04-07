import React, { useState } from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { ErrorMap } from "../Types/ErrorMap";
import { MyMessage } from "../Types/MyMessage";

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
  const [done, setDone] = useState(false);
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
        text: "Internal server error",
      });
      return null;
    }

    if (data?.login.error) {
      return {
        [data.login.error.field]: data.login.error.message,
      };
    }

    onFinish();
    return null;
  };

  return children({
    submit,
    message,
  });
};
