import React from "react";
import { init_dayjs } from "./lib/dayjs";
import { AuthSwitch } from "./navigation/AuthSwitch";
import { Providers } from "./Providers";

init_dayjs();

export const App: React.FC = ({}) => {
  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};
