import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "543484748190-1ease60qde5gfvvuc8e4576ckt4c16om.apps.googleusercontent.com";

export default ({ isLoggedIn, handleLoginSuccess, handleLogoutSuccess }) => {
  const handleFailure = response => console.error(response);

  return (
    <div className="navBarContainer">
      <a className="logo" href="#">
        Shipwrecks.cc
      </a>
      <a className="github" href="https://github.com/lauriharpf/shipwrecks">
        GitHub
      </a>
      {!isLoggedIn ? (
        <GoogleLogin
          className="loginButton"
          clientId={clientId}
          buttonText="Login"
          onSuccess={handleLoginSuccess}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <GoogleLogout
          className="loginButton"
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleFailure}
          buttonText="Logout"
        />
      )}
    </div>
  );
};
