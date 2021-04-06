import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/global.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
