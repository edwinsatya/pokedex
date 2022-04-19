import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing) {
                return {
                  ...incoming,
                  results: [...existing.results, ...incoming.results],
                };
              }
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
