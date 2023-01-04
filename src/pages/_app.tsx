import './../scss/main.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trpc } from '../utils/trpc';
import { store } from '../store';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import PageFade from '../animations/page-fade';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import AppProvider from '../providers/app-provider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <AnimatePresence mode="wait" key={router.pathname}>
            {getLayout(
              <PageFade>
                <Component {...pageProps} />
              </PageFade>
            )}
          </AnimatePresence>
          <ReactQueryDevtools />
        </AppProvider>
      </Provider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
