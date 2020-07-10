const AUTH_CONFIG_LOCAL = {
  domain: process.env.REACT_APP_AUTH_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID_LOCAL as string,
  audience: process.env.REACT_APP_AUTH_AUDIENCE as string,
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK_URL_LOCAL as string,
};

const AUTH_CONFIG_REMOTE = {
  domain: process.env.REACT_APP_AUTH_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID_REMOTE as string,
  audience: process.env.REACT_APP_AUTH_AUDIENCE as string,
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK_URL_REMOTE as string,
};

export const AUTH_CONFIG =
  process.env.NODE_ENV === "production"
    ? AUTH_CONFIG_REMOTE
    : AUTH_CONFIG_LOCAL;
