import React, { useState } from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import MyMessage from "../Types/MyMessage";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginControllerProps {
  children: (data: {
    submit: (values: LoginFormValues) => Promise<any>;
    message: MyMessage | null;
    done: boolean;
  }) => JSX.Element | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
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

    setDone(true);
    return null;
  };

  return children({
    submit,
    message,
    done,
  });
};
