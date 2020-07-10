import ReactDOM from "react-dom";
import React from "react";

import { Auth0Provider } from "src/components/Auth/react-auth0-spa";
import { ApolloWrapper } from "src/ApolloWrapper";
import history from "src/utils/history";
import { AUTH_CONFIG } from "src/components/Auth/auth0-variables";

import { App } from "src/App";

// fixme
const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const mainRoutes = (
  <Auth0Provider
    domain={AUTH_CONFIG.domain}
    client_id={AUTH_CONFIG.clientId}
    redirect_uri={AUTH_CONFIG.callbackUrl}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </Auth0Provider>
);

ReactDOM.render(mainRoutes, document.getElementById("root"));
