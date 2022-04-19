import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              // return [...existing, ...incoming];
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
