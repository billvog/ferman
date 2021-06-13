import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import isDate from "lodash/isDate";
import { __prod__ } from "./constants";
import { i18nLocaleResources } from "@ferman-pkgs/controller";

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
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      detection: DETECTION_OPTIONS,
      fallbackLng: "en",
      resources: i18nLocaleResources,
      debug: !__prod__,
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
      initImmediate: false,
      react: {
        useSuspense: false,
      },
    });
};
