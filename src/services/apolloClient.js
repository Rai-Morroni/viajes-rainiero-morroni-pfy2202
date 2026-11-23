import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Cliente GraphQL compartido por la aplicación: usa el endpoint interceptado por
// MSW y una caché en memoria para reutilizar resultados durante la sesión.
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});