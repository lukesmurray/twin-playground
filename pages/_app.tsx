import "../styles/prism-vsc-dark-plus.css";

import { cache } from "@emotion/css";
import { CacheProvider } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

import GlobalStyles from "../styles/GlobalStyles";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <CacheProvider value={cache}>
      <GlobalStyles />
      {getLayout(<Component {...pageProps} />)}
    </CacheProvider>
  );
}

export default MyApp;
