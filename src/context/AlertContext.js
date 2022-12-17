import { createContext, useState } from "react";

export const AlertContext = createContext({
  alertState: "", // show or hide
  toggleAlert: (state, msg, res) => {},
  message: "",
  result: "", // success or error
});

export const AlertContextProvider = ({ children }) => {
  const [alertState, setAlertState] = useState("hide");
  const [message, setMessage] = useState(null);
  const [result, setResult] = useState(null);

  const toggleAlert = (state, msg, res) => {
    setAlertState(state);

    setMessage(msg);
    setResult(res);
  };

  const initialCtx = {
    alertState,
    toggleAlert,
    message,
    result,
  };

  return (
    <AlertContext.Provider value={initialCtx}>{children}</AlertContext.Provider>
  );
};
