import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import isDate from "lodash/isDate";
import { __prod__ } from "../constants/env";
import * as Localization from "expo-localization";

const resources = {
  en: {
    translation: require("../../locales/en/translation.json"),
  },
  el: {
    translation: require("../../locales/el/translation.json"),
  },
};

const DETECTION_OPTIONS = {
  order: ["localStorage", "navigator"],
};

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

  await i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // see opts @ https://www.i18next.com/overview/configuration-options
    .init({
      resources,
      detection: DETECTION_OPTIONS,
      fallbackLng: "en",
      lng: Localization.locale,
      debug: true,
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
      keySeparator: false,
    });
};
