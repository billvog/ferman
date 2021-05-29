import i18n from "i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../generated/localeImports";

export const init_dayjs = () => {
  dayjs.locale(i18n.language);
  dayjs.extend(relativeTime);
};
