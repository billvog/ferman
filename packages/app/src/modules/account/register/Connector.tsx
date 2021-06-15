import React, { useEffect, useState } from "react";
import { RegisterView } from "./View";
import {
  RegisterController,
  RegisterFormValues,
  RegisterPhase,
} from "@ferman-pkgs/controller";

interface RegisterConnectorProps {}
export const RegisterConnector: React.FC<RegisterConnectorProps> = ({}) => {
  const [initialValues, setInitialValues] = useState<RegisterFormValues>();
  const [initialPhase, setInitialPhase] = useState<RegisterPhase | null>(null);

  useEffect(() => {
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
  }, []);

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
