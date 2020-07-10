import React from "react";
import { useAuth0 } from "src/components/Auth/react-auth0-spa";

export const Login = () => {
  const { loading, loginWithRedirect } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-heading">
          Welcome to the GraphQL tutorial app
        </div>
        <div className="overlay-message">Please login to continue</div>
        <div className="overlay-action">
          <button
            onClick={() => {
              loginWithRedirect({});
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
