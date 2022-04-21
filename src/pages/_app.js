import "../styles/globals.css";
import "../components/buttons/menu.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;