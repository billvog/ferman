import React, { useState } from "react";
import { ErrorMap } from "../../Types/ErrorMap";
import { MyMessage } from "../../Types/MyMessage";
import {
  useAccountDeletionRequestMutation,
  useValidateAccountDeletionTokenMutation,
  useValidateAccountDeletionTokenWithPasswordMutation,
  useFinishAccountDeletionMutation,
} from "../../generated/graphql";

export type DeleteUserPhase = 0 | 1 | 2 | 3;
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
  const [
    validateTokenWithPassword,
  ] = useValidateAccountDeletionTokenWithPasswordMutation();
  const [finishAccountDeletion] = useFinishAccountDeletionMutation();

  const submit = async (values: DeleteUserFormValues) => {
    if (phase === 0) {
      const { data } = await deleteRequest();
      if (!data || !data.accountDeletionRequest) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return null;
      }

      setPhase(1);
      setMessage({
        type: "success",
        text: "delete_account.message.phase1_success",
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
          text: "errors.500",
        });
        return null;
      }

      if (!data.validateAccountDeletionToken) {
        setMessage({
          type: "error",
          text: "delete_account.message.phase2_invalid",
        });
        return null;
      }

      setPhase(2);
      setMessage(null);
    } else if (phase === 2) {
      // verify that password is correct
      const { data } = await validateTokenWithPassword({
        variables: {
          password: values.password,
          token: values.code,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return null;
      }

      if (!data.validateAccountDeletionTokenWithPassword) {
        setMessage({
          type: "error",
          text: "delete_account.message.phase3_wrong",
        });
        return null;
      }

      setPhase(3);
      setMessage(null);
    } else if (phase === 3) {
      const { data } = await finishAccountDeletion({
        variables: {
          password: values.password,
          token: values.code,
        },
      });

      if (!data) {
        setMessage({
          type: "error",
          text: "errors.500",
        });
        return null;
      }

      if (data.finishAccountDeletion) {
        setMessage({
          type: "error",
          text: data.finishAccountDeletion.message,
        });
        return null;
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
