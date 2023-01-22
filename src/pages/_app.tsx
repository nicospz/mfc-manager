import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { client } from "@/helpers/apollo";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
