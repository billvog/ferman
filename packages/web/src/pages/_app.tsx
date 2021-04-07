import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/global.css";

function MyApp({ Component, pageProps }: any) {
  toast.configure({
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnHover: true,
  });

  return <Component {...pageProps} />;
}

export default MyApp;
