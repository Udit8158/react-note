import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  logIn: (usr) => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("react-note-app-user"));
  //    JSON.parse(localStorage.getItem("react-note-app-user"));
  const [user, setUser] = useState(initialUser);
  const isLoggedIn = !!user;

  const logInHandler = (usr) => {
    setUser(usr);

    localStorage.setItem("react-note-app-user", JSON.stringify(usr));
  };
  const logOutHandler = () => {
    localStorage.removeItem("react-note-app-user");
    setUser(null);
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
