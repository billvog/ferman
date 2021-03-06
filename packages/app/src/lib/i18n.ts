import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import isDate from "lodash/isDate";
import { __prod__ } from "../constants/env";
import * as Localization from "expo-localization";
import { i18nLocaleResources } from "../../../controller/dist";
import AsyncStorage from "@react-native-async-storage/async-storage";

function createDateFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    case "intlDate": {
      // EN returns 3/16/2021, 5:45 PM
      return {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    }
    case "intlTime": {
      // EN returns 05:45 PM
      return {
        hour: "numeric",
        minute: "numeric",
      };
    }
    default: {
      // EN returns Tuesday, March 16, 2021, 5:45 PM
      return {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
    }
  }
}

export const init_i18n = async () => {
  if (i18n.isInitialized) return;

  let lng = await AsyncStorage.getItem("language");
  if (lng === null) {
    lng = Localization.locale.substring(0, 2);
  }

  await i18n.use(initReactI18next).init({
    resources: i18nLocaleResources,
    fallbackLng: "en",
    lng,
    // debug: !__prod__,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        return isDate(value) && format
          ? new Intl.DateTimeFormat(lng, createDateFormatOptions(format))
              .format(value)
              .toString()
          : value;
      },
    },
  });
};
