import React, { useEffect, useState } from "react";
import { RegisterView } from "./RegisterView";
import {
  RegisterController,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";
import { isServer } from "../../../utils/isServer";

interface RegisterConnectorProps {}

export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
  const [initialValues, setInitialValues] = useState<RegisterFormValues>();
  const [initialPhase, setInitialPhase] = useState<RegisterPhase | null>(null);

  useEffect(() => {
    if (isServer()) return;

    setInitialValues(
      JSON.parse(
        localStorage.getItem("stored.InitialRegisterValues") || "{}"
      ) as RegisterFormValues
    );

    setInitialPhase(
      parseInt(
        localStorage.getItem("stored.InitialRegisterPhase") || "0"
      ) as RegisterPhase
    );
  }, [isServer()]);

  return (
    <>
      {typeof initialValues !== "undefined" && initialPhase !== null && (
        <RegisterController initialPhase={initialPhase}>
          {(props) => (
            <RegisterView {...props} storedInitialValues={initialValues} />
          )}
        </RegisterController>
      )}
    </>
  );
};
