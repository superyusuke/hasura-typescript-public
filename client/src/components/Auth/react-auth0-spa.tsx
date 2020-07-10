import React, { useState, useEffect, useContext, FC } from "react";
import createAuth0Client, {
  IdToken,
  Auth0ClientOptions,
  getIdTokenClaimsOptions,
  RedirectLoginOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
} from "@auth0/auth0-spa-js";
import Auth0ClientType from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import Callback from "src/components/Auth/Callback";
import { Login } from "src/components/Auth/Login";
import { AUTH_CONFIG } from "src/components/Auth/auth0-variables";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

// https://github.com/keiffff/Insta-Clone/blob/master/src/providers/Auth0.tsx 参照
type Auth0ContextType = {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: any;
  loginWithPopup: any;
  handleRedirectCallback: any;
  getIdTokenClaims: (options?: getIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (options: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (
    options?: GetTokenSilentlyOptions
  ) => Promise<string | undefined>;
  getTokenWithPopup: (
    options?: GetTokenWithPopupOptions
  ) => Promise<string | undefined>;
  logout: (options?: LogoutOptions) => void;
  idToken: string;
};

export const Auth0Context = React.createContext<Auth0ContextType>(
  (null as unknown) as Auth0ContextType
);
export const useAuth0 = () => useContext(Auth0Context);

type Auth0ProviderProps = {
  onRedirectCallback: any;
} & Auth0ClientOptions;

export const Auth0Provider: FC<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState(
    (null as unknown) as Auth0ClientType
  );
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
        const idTokenClaims = await auth0FromHook.getIdTokenClaims();
        setIdToken(idTokenClaims.__raw);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    const result = await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    const idTokenClaims = await auth0Client.getIdTokenClaims();
    setIdToken(idTokenClaims.__raw);

    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
    return result;
  };

  if (loading) {
    return <Callback />;
  }
  if (!isAuthenticated) {
    return (
      <Auth0Context.Provider
        value={{
          isAuthenticated,
          user,
          loading,
          popupOpen,
          loginWithPopup,
          handleRedirectCallback,
          getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
          loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
          getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
          getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
          logout: (...p) => auth0Client.logout(...p),
          idToken,
        }}
      >
        <Login />
      </Auth0Context.Provider>
    );
  }

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) =>
          auth0Client.logout({ ...p, returnTo: AUTH_CONFIG.callbackUrl }),
        idToken,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
