import { toast } from "react-toastify";
import { init_i18n } from "../lib/i18n";
import { isServer } from "../utils/isServer";
import "react-toastify/dist/ReactToastify.css";
import "../css/global.css";

if (!isServer()) {
  init_i18n();
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

  return <Component {...pageProps} />;
}

export default MyApp;
