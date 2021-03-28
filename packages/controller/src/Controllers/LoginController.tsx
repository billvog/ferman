import React, { useState } from "react";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";

export interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginControllerProps {
  children: (data: {
    submit: (values: LoginFormValues) => Promise<any>;
    done: boolean;
  }) => JSX.Element | null;
}

export const LoginController: React.FC<LoginControllerProps> = ({
  children,
}) => {
  const [message, setMessage] = useState("");
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
      setMessage("Internal server error");
      return null;
    }

    if (data?.login.error) {
      return {
        [data.login.error.field]: data.login.error.message,
      };
    }

    setDone(true);
  };

  return children({
    submit,
    done,
  });
};
