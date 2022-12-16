import { createContext, useState } from "react";

export const ThemeContext = createContext({
  mode: "",
  toggleMode: (mode) => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleModeHandler = (themeMode) => {
    if (themeMode === "light") setThemeMode("dark");
    if (themeMode === "dark") setThemeMode("light");
  };

  const initialCtx = {
    mode: themeMode,
    toggleMode: toggleModeHandler,
  };

  return (
    <ThemeContext.Provider value={initialCtx}>{children}</ThemeContext.Provider>
  );
};
