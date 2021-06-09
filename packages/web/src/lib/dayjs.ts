import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import i18n from "i18next";
import "../generated/localeImports";

export const init_dayjs = () => {
  dayjs.locale(i18n.language);
  dayjs.extend(relativeTime);
  dayjs.extend(calendar);
};
