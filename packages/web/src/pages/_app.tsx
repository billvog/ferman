import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import "../css/global.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
