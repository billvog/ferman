import i18n from "i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";
import { AllLocales } from "@ferman-pkgs/controller";
import "@ferman-pkgs/controller/src/generated/localeImports";

export const init_dayjs = () => {
  dayjs.locale(i18n.language);
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);
  dayjs.extend(updateLocale);
  AllLocales.map((l) => {
    dayjs.updateLocale(l, {
      calendar: {
        sameDay: `[${i18n.t("dayjs.calendar.today_at")}] h:mm A`,
        nextDay: `[${i18n.t("dayjs.calendar.tomorrow")}]`,
        nextWeek: "dddd",
        lastDay: `[${i18n.t("dayjs.calendar.yesterday")}]`,
        lastWeek: `[${i18n.t("dayjs.calendar.last")}] dddd`,
        sameElse: "DD/MM/YYYY",
      },
      meridiem: (hour: any) => {
        return hour > 12
          ? i18n.t("dayjs.meridiem.pm")
          : i18n.t("dayjs.meridiem.am");
      },
    });
  });
};
