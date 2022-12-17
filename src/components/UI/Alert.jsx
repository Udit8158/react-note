import React from "react";

function Alert({ message, result }) {
  return (
    <div
      className={`p-4 mb-4 fixed top-2 right-2 text-sm ${
        result === "success" ? "text-success bg-success" : "text-error bg-error"
      } rounded-lg `}
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}

export default Alert;
