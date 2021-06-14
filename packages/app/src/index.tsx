import "localstorage-polyfill";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { CenterSpinner } from "./components/CenterSpinner";
import { init_dayjs } from "./lib/dayjs";
import { init_i18n } from "./lib/i18n";
import { OfflineError } from "./modules/error/OfflineError";
import { AuthSwitch } from "./navigation/AuthSwitch";
import { Providers } from "./Providers";
import * as Font from "expo-font";

export const App: React.FC = ({}) => {
  const [isOnline, setIsOnline] = useState<boolean | undefined>(undefined);
  const [isI18nReady, setIsI18nReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      Inter: require("../assets/fonts/inter/Regular.ttf"),
      "Inter-Black": require("../assets/fonts/inter/Black.ttf"),
      "Inter-Bold": require("../assets/fonts/inter/Bold.ttf"),
      "Inter-ExtraBold": require("../assets/fonts/inter/ExtraBold.ttf"),
      "Inter-Light": require("../assets/fonts/inter/Light.ttf"),
      "Inter-Medium": require("../assets/fonts/inter/Medium.ttf"),
      "Inter-Thin": require("../assets/fonts/inter/Thin.ttf"),
    });

    setFontsLoaded(true);
  };

  useEffect(() => {
    // load fonts
    loadFonts();

    // setup locales and dayjs
    (async () => {
      await init_i18n();
      init_dayjs();
      setIsI18nReady(true);
    })();

    // check if is online
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected || false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded || !isI18nReady || isOnline === undefined) {
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
