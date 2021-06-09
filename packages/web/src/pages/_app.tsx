import { toast } from "react-toastify";
import { init_i18n } from "../lib/i18n";
import { init_dayjs } from "../lib/dayjs";
import { isServer } from "../utils/isServer";
import { GlobalModals } from "../modules/display/GlobalModals";
import "react-toastify/dist/ReactToastify.css";
import "../css/global.css";
import dayjs from "dayjs";
import { allLocales } from "../generated/localeImports";
import { useTypeSafeTranslation } from "../shared-hooks/useTypeSafeTranslation";
import updateLocale from "dayjs/plugin/updateLocale";

if (!isServer()) {
  (async () => {
    await init_i18n();
    init_dayjs();
  })();
}

function MyApp({ Component, pageProps }: any) {
  toast.configure({
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnHover: true,
    toastClassName: "toast-component",
  });

  // localize dayjs calendar
  const { t } = useTypeSafeTranslation();
  dayjs.extend(updateLocale);
  allLocales.map((l) => {
    dayjs.updateLocale(l, {
      calendar: {
        sameDay: `[${t("dayjs.calendar.today_at")}] h:mm A`,
        nextDay: `[${t("dayjs.calendar.tomorrow")}]`,
        nextWeek: "dddd",
        lastDay: `[${t("dayjs.calendar.yesterday")}]`,
        lastWeek: `[${t("dayjs.calendar.last")}] dddd`,
        sameElse: "DD/MM/YYYY",
      },
      meridiem: (hour: any) => {
        return hour > 12 ? t("dayjs.meridiem.pm") : t("dayjs.meridiem.am");
      },
    });
  });

  return (
    <>
      <Component {...pageProps} />
      <GlobalModals />
    </>
  );
}

export default MyApp;
