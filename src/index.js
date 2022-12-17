import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { AlertContextProvider } from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthContextProvider>
        <AlertContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </AlertContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
);
