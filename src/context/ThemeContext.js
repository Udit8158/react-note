import { createContext, useState } from "react";

export const ThemeContext = createContext({
  mode: "",
  toggleMode: (mode) => {},
});

export const ThemeContextProvider = ({ children }) => {
  const localStorageTheme = localStorage.getItem("react-note-app-theme");

  const [themeMode, setThemeMode] = useState(
    localStorageTheme ? localStorageTheme : "light"
  );

  const toggleModeHandler = (themeMode) => {
    if (themeMode === "light") {
      setThemeMode("dark");
      localStorage.setItem("react-note-app-theme", "dark");
    }
    if (themeMode === "dark") {
      setThemeMode("light");
      localStorage.setItem("react-note-app-theme", "light");
    }
  };

  const initialCtx = {
    mode: themeMode,
    toggleMode: toggleModeHandler,
  };

  return (
    <ThemeContext.Provider value={initialCtx}>{children}</ThemeContext.Provider>
  );
};
