import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/global.css";
import { init_dayjs } from "../lib/dayjs";
import { init_i18n } from "../lib/i18n";
import { GlobalModals } from "../modules/display/GlobalModals";
import { isServer } from "../utils/isServer";

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

  return (
    <>
      <Component {...pageProps} />
      <GlobalModals />
    </>
  );
}

export default MyApp;
