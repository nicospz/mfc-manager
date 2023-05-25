import '@styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useApollo } from '@lib/apolloClient';
import Layout from '@components/Layout';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);
    return (
        <ApolloProvider client={apolloClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    );
}
