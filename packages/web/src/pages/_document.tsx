import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <noscript>You need javascript enabled to use this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
