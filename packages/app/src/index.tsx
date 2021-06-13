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
      "Roboto-Black": require("../assets/fonts/roboto/Black.ttf"),
      "Roboto-Bold": require("../assets/fonts/roboto/Bold.ttf"),
      "Roboto-Italic": require("../assets/fonts/roboto/Italic.ttf"),
      "Roboto-Light": require("../assets/fonts/roboto/Light.ttf"),
      "Roboto-Medium": require("../assets/fonts/roboto/Medium.ttf"),
      "Roboto-Regular": require("../assets/fonts/roboto/Regular.ttf"),
      "Roboto-Thin": require("../assets/fonts/roboto/Thin.ttf"),
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
      setIsOnline(state.isConnected);
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
