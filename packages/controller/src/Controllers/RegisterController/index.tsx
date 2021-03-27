import React, { useState } from "react";
import { USER_PASSWORD_SHAPE } from "@ferman/common";
import {
  MeDocument,
  MeQuery,
  useFinishRegisterMutation,
  useRegisterMutation,
  useValidateRegisterTokenMutation,
} from "../../generated/graphql";

export type RegisterPhase = 0 | 1 | 2;
export interface RegisterFormValues {
  uid: string;
  username: string;
  email: string;
  birthdate: string;
  code: string;
  password: string;
}

interface Props {
  children: (data: {
    phase: RegisterPhase;
    message: {
      text: string;
      type: "success" | "error";
    } | null;
    done: boolean;
    submit: (values: RegisterFormValues) => Promise<any>;
  }) => JSX.Element | null;
}

export const RegisterController: React.FC<Props> = ({ children }) => {
  const [phase, setPhase] = useState<RegisterPhase>(0);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
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
          text: "Internal server error",
          type: "error",
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
        text:
          "An email has been sent to the email address you've given. There, are instructions on how to continue setting up your account.",
        type: "success",
      });
    } else if (phase === 1) {
      const { data } = await validateToken({
        variables: {
          token: values.code,
        },
      });

      if (!data?.validateRegisterToken) {
        return {
          code: "Provided code is incorrect",
        };
      }

      setMessage(null);
      setPhase(2);
    } else if (phase === 2) {
      try {
        await USER_PASSWORD_SHAPE.validate(values.password);
      } catch (error) {
        return {
          password: error.message,
        };
      }

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
        setMessage({
          text: "Internal server error",
          type: "error",
        });

        return null;
      }

      if (data?.finishRegister.error) {
        if (data.finishRegister.error.field === "token") {
          setMessage({
            text: data.finishRegister.error.message,
            type: "error",
          });

          return null;
        }

        return {
          [data.finishRegister.error.field]: data.finishRegister.error.message,
        };
      }

      setDone(true);
    }

    return null;
  };

  return children({
    phase,
    message,
    done,
    submit,
  });
};