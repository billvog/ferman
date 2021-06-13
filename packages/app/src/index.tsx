import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { CenterSpinner } from "./components/CenterSpinner";
import { init_dayjs } from "./lib/dayjs";
import { init_i18n } from "./lib/i18n";
import { OfflineError } from "./modules/error/OfflineError";
import { AuthSwitch } from "./navigation/AuthSwitch";
import { Providers } from "./Providers";

export const App: React.FC = ({}) => {
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await init_i18n();
      init_dayjs();
      setIsLoading(false);
    })();

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isOnline === undefined || isLoading) {
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
