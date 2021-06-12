import React from "react";
import { init_dayjs } from "./lib/dayjs";
import { init_i18n } from "./lib/i18n";
import { AuthSwitch } from "./navigation/AuthSwitch";
import { Providers } from "./Providers";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useState } from "react";
import { CenterSpinner } from "./components/CenterSpinner";
import { OfflineError } from "./modules/error/OfflineError";

(async () => {
  await init_i18n();
  init_dayjs();
})();

export const App: React.FC = ({}) => {
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isOnline === undefined) {
    return <CenterSpinner />;
  } else if (!isOnline) {
    return <OfflineError />;
  }

  return (
    <Providers>
      <AuthSwitch />
    </Providers>
  );
};
