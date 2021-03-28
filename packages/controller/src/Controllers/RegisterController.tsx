import React, { useState } from "react";
import MyMessage from "../Types/MyMessage";
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
    message: MyMessage | null;
    phase: RegisterPhase;
    done: boolean;
  }) => JSX.Element | null;
}

export const RegisterController: React.FC<RegisterControllerProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
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
        setMessage({
          type: "error",
          text: "Internal server error",
        });
        return null;
      }

      if (data?.register) {
        return {
          [data.register.field]: data.register.message,
        };
      }

      setPhase(1);
      setMessage({
        type: "success",
        text:
          "An email has been sent to the email address you've given. There, are instructions on how to continue setting up your account.",
      });
    } else if (phase === 1) {
      const { data } = await validateToken({
        variables: {
          token: values.code,
        },
      });

      if (!data?.validateRegisterToken) {
        setMessage({ type: "error", text: "Invalid token provided" });
        return null;
      }

      setMessage(null);
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
        setMessage({ type: "error", text: "Internal server error" });
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
    phase,
    done,
  });
};
