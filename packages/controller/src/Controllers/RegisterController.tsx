import React, { useState } from "react";
import {
  MeDocument,
  MeQuery,
  useFinishRegisterMutation,
  useRegisterMutation,
  useValidateRegisterTokenMutation,
} from "../generated/graphql";

export type RegisterPhase = 0 | 1 | 2;
export interface RegisterFormValues {
  uid: string;
  username: string;
  email: string;
  birthdate: string;
  code: string;
  password: string;
}

interface RegisterControllerProps {
  children: (data: {
    submit: (values: RegisterFormValues) => Promise<any>;
    message: string;
    error: boolean;
    phase: RegisterPhase;
    done: boolean;
  }) => JSX.Element | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [phase, setPhase] = useState<RegisterPhase>(0);
  const [done, setDone] = useState(false);

  const [register] = useRegisterMutation();
  const [validateToken] = useValidateRegisterTokenMutation();
  const [finishRegister] = useFinishRegisterMutation({
    update: async (store, { data }) => {
      await store.reset();
      store.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data?.finishRegister.user,
        },
      });
    },
  });

  const submit = async (values: RegisterFormValues) => {
    if (phase === 0) {
      const { data } = await register({
        variables: {
          options: {
            uid: values.uid,
            username: values.username,
            email: values.email,
            birthdate: values.birthdate,
          },
        },
      });

      if (!data) {
        setError(true);
        setMessage("Internal server error");
        return null;
      }

      if (data?.register) {
        return {
          [data.register.field]: data.register.message,
        };
      }

      setPhase(1);
      setError(false);
      setMessage(
        "An email has been sent to the email address you've given. There, are instructions on how to continue setting up your account."
      );
    } else if (phase === 1) {
      const { data } = await validateToken({
        variables: {
          token: values.code,
        },
      });

      if (!data?.validateRegisterToken) {
        setError(true);
        setMessage("Invalid token provided");
        return null;
      }

      setMessage("");
      return setPhase(2);
    } else if (phase === 2) {
      const { data } = await finishRegister({
        variables: {
          password: values.password,
          token: values.code,
          options: {
            uid: values.uid,
            username: values.username,
            email: values.email,
            birthdate: values.birthdate,
          },
        },
      });

      if (!data) {
        setError(true);
        setMessage("Internal server error");
        return null;
      }

      if (data?.finishRegister.error) {
        return {
          [data.finishRegister.error.field]: data.finishRegister.error.message,
        };
      }

      setDone(true);
    }
  };

  return children({
    submit,
    message,
    error,
    phase,
    done,
  });
};
