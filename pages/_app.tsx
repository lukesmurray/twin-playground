import "../styles/prism-vsc-dark-plus.css";

import { cache } from "@emotion/css";
import { CacheProvider, Global } from "@emotion/react";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import tw, { css } from "twin.macro";

import GlobalStyles from "../styles/GlobalStyles";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const styles = {
  global: css`
    html,
    body,
    #__next {
      height: 100%;
    }

    #__next {
      ${tw`p-5`}
    }
  `,
  page: [
    tw`flex flex-col gap-10 p-5 min-h-full bg-gray-100 rounded shadow mx-auto`,
    css`
      max-width: 90ch;
    `,
  ],
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Twin.Macro Playground</title>
        <meta property="og:title" content="Twin.Macro Playground" />
        <meta
          property="og:description"
          content="The ✨first✨ online playground for Twin.macro. Created by @lukesmurray."
        />
        <meta
          property="og:image"
          content="https://twin-playground.vercel.app/preview.png"
        />
        <meta name="twitter:creator" content="@lukesmurray" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <GlobalStyles />
      <Global styles={styles.global} />
      <div css={styles.page}>
        <Component {...pageProps} />
      </div>
    </CacheProvider>
  );
}

export default MyApp;
