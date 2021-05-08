import React, { useState } from "react";
import { ErrorMap } from "../../Types/ErrorMap";
import { MyMessage } from "../../Types/MyMessage";
import {
  useAccountDeletionRequestMutation,
  useValidateAccountDeletionTokenMutation,
  useFinishAccountDeletionMutation,
} from "../../generated/graphql";

export type DeleteUserPhase = 0 | 1 | 2;
export interface DeleteUserFormValues {
  password: string;
  code: string;
}

interface DeleteUserControllerProps {
  onFinish: () => any;
  children: (data: {
    submit: (values: DeleteUserFormValues) => Promise<ErrorMap | null>;
    message: MyMessage | null;
    phase: DeleteUserPhase;
    done: boolean;
  }) => JSX.Element;
}

export const DeleteUserController: React.FC<DeleteUserControllerProps> = ({
  onFinish,
  children,
}) => {
  const [message, setMessage] = useState<MyMessage | null>(null);
  const [phase, setPhase] = useState<DeleteUserPhase>(0);
  const [done, setDone] = useState(false);

  const [deleteRequest] = useAccountDeletionRequestMutation();
  const [validateToken] = useValidateAccountDeletionTokenMutation();
  const [finishAccountDeletion] = useFinishAccountDeletionMutation();

  const submit = async (values: DeleteUserFormValues) => {
    if (phase === 0) {
      const { data } = await deleteRequest();
      if (!data || !data.accountDeletionRequest) {
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

      if (!data.validateAccountDeletionToken) {
        setMessage({ type: "error", text: "The provided code is not valid" });
        return null;
      }

      setPhase(2);
      setMessage(null);
    } else if (phase === 2) {
      const { data } = await finishAccountDeletion({
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

      if (data.finishAccountDeletion) {
        return {
          [data.finishAccountDeletion.field]:
            data.finishAccountDeletion.message,
        };
      }

      setDone(true);
      onFinish();
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
