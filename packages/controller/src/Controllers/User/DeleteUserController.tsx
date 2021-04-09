import React, { useState } from "react";
import { ErrorMap } from "../../Types/ErrorMap";
import { MyMessage } from "../../Types/MyMessage";
import {
  useDeleteAccountRequestMutation,
  useValidateAccDelTokenMutation,
  useDeleteAccountFinalMutation,
} from "../../generated/graphql";

export type DeleteUserPhase = 0 | 1 | 2;
export interface DeleteUserFormValues {
  password: string;
  code: string;
}

interface DeleteUserControllerProps {
  children: (data: {
    submit: (values: DeleteUserFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
    phase: DeleteUserPhase;
    done: boolean;
  }) => JSX.Element;
}

export const DeleteUserController: React.FC<DeleteUserControllerProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [phase, setPhase] = useState<DeleteUserPhase>(0);
  const [done, setDone] = useState(false);

  const [deleteUserReq] = useDeleteAccountRequestMutation();
  const [validateToken] = useValidateAccDelTokenMutation();
  const [deleteUserFinal] = useDeleteAccountFinalMutation();

  const submit = async (values: DeleteUserFormValues) => {
    if (phase === 0) {
      const { data } = await deleteUserReq();
      if (!data || !data.deleteAccountRequest) {
        setMessage({
          type: "error",
          text: "Internal server error",
        });
        return null;
      }

      setPhase(1);
      setMessage({
        type: "success",
        text:
          "An email has been sent to your email address. There, are instructions on how to proceed.",
      });
    } else if (phase === 1) {
      const { data } = await validateToken({
        variables: {
          token: values.code,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "Internal server error",
        });
        return null;
      }

      if (!data.validateAccDelToken) {
        setMessage({ type: "error", text: "The provided code is not valid" });
        return null;
      }

      setPhase(2);
    } else if (phase === 2) {
      const { data } = await deleteUserFinal({
        variables: {
          password: values.password,
          token: values.code,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "Internal server error",
        });
        return null;
      }

      if (data.deleteAccountFinal) {
        return {
          [data.deleteAccountFinal.field]: data.deleteAccountFinal.message,
        };
      }

      setDone(true);
    }

    return null;
  };

  return children({
    submit,
    message,
    phase,
    done,
  });
};
