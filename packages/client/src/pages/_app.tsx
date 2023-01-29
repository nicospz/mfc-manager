import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === "production"
        ? "/graphql"
        : `http://localhost:${process.env.PORT ?? "8080"}/graphql`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
