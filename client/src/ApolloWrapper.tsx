import React from "react";

import { useAuth0 } from "src/components/Auth/react-auth0-spa";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { ApolloProvider } from "@apollo/react-hooks";

const websocketUri =
  process.env.NODE_ENV === "production"
    ? (process.env.REACT_APP_WEBSOCKET_LINK_REMOTE as string)
    : (process.env.REACT_APP_WEBSOCKET_LINK_LOCAL as string);

const createApolloClient = (authToken: any) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: websocketUri,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  });
};

export const ApolloWrapper: React.FC = ({ children }) => {
  const { idToken } = useAuth0();

  const client = createApolloClient(idToken);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
