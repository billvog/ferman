import React, { useState } from "react";
import { ErrorMap } from "../../Types/ErrorMap";
import { MyMessage } from "../../Types/MyMessage";
import { useDeleteAccountMutation } from "../../generated/graphql";

export type DeleteUserPhase = 0 | 1;
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

  const [deleteUser] = useDeleteAccountMutation();

  return <div>aksmd</div>;
};
