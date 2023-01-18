import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import type { AppProps } from 'next/app';
config.autoAddCss = false;

export default function App ({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          cacheTime: 1 * 60 * 60 * 1000,
          staleTime: 1 * 60 * 60 * 1000,
          retry: 1
        }
      }
    }
  ));

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
