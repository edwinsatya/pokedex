import "../styles/globals.css";
import "../components/buttons/menu.css";
import apolloClient from "../lib/apollo-client";
import { ContextProvider } from "../store/context";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ContextProvider>
  );
}

export default MyApp;
