import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const userIsLoggedIn = !!token;

  const clearLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    clearLogoutTimer();
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    const expirationTime = new Date().getTime() + 60000; 
    localStorage.setItem("expirationTime", expirationTime);
    clearLogoutTimer();
    const timer = setTimeout(logoutHandler, 60000); 
    setLogoutTimer(timer);
  };

  useEffect(() => {
    const storedExpirationTime = localStorage.getItem("expirationTime");
    if (initialToken && storedExpirationTime) {
      const remainingTime = storedExpirationTime - new Date().getTime();
      if (remainingTime <= 0) {
        logoutHandler();
      } else {
        clearLogoutTimer();
        const timer = setTimeout(logoutHandler, remainingTime);
        setLogoutTimer(timer);
      }
    }
  }, [initialToken]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
