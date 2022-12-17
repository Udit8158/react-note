import React, { useContext, useState } from "react";
import { AlertContext } from "../../context/AlertContext";
import { ThemeContext } from "../../context/ThemeContext";
import Alert from "../UI/Alert";
import Sidebar from "../UI/Sidebar";

function Layout({ children }) {
  const mode = useContext(ThemeContext).mode;
  const { alertState, message, result } = useContext(AlertContext);

  const [isOpen, setIsOpen] = useState(false);

  // console.log(alertState);
  return (
    <>
      {alertState === "show" && <Alert message={message} result={result} />}
      <div
        className={`flex duration-500 min-h-screen ${
          mode === "light" ? "bg-background-light" : "bg-background-dark"
        }`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-screen"
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
