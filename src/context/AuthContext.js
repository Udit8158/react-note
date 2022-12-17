import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "./AlertContext";

export const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  logIn: (usr) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const initialLocalStorage = localStorage.getItem("react-note-app-user");

  const [user, setUser] = useState(
    initialLocalStorage ? JSON.parse(initialLocalStorage).user : null
  );
  const isLoggedIn = !!user;

  const logInHandler = (usr) => {
    setUser(usr);

    localStorage.setItem("react-note-app-user", JSON.stringify({ user: usr }));
    navigate("/");
  };
  const logOutHandler = () => {
    localStorage.removeItem("react-note-app-user");
    setUser(null);
    navigate("/");
  };

  const initialVal = {
    user,
    isLoggedIn,
    logIn: logInHandler,
    logOut: logInHandler,
  };
  return (
    <AuthContext.Provider value={initialVal}>{children}</AuthContext.Provider>
  );
};
