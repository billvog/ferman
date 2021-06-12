import React from "react";
import { AuthSwitch } from "./navigation/AuthSwitch";
import { Providers } from "./Providers";

export const App: React.FC = ({}) => {
  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};
