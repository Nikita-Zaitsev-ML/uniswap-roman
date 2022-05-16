import { FC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createEmotionCache, initAxe } from 'src/core';
import { wrapper } from 'src/app/store';
import { DefaultLayout } from 'src/modules/shared/pageTemplates';
import { ThemeProvider } from 'src/services/theme';
import type { NextPageWithLayout } from 'src/shared/types';
import 'src/shared/styles/base/base.css';

/**
 * Accessibility tool - outputs to devtools console on dev only and client-side only.
 * @see https://github.com/dequelabs/axe-core-npm/blob/develop/packages/react/README.md
 */
initAxe();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type Props = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const CustomApp: FC<Props> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </CacheProvider>
  );
};

const WrappedCustomApp = wrapper.withRedux(CustomApp);

export default WrappedCustomApp;
