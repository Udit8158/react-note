import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

function Details({ createdAt, lastEdited, isEdited }) {
  const { mode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100" : "bg-gray-900"
      } flex flex-col gap-5 p-2 rounded-lg ${
        mode === "light" ? "text-black" : "text-white"
      } duration-500  `}
    >
      {isEdited && (
        <div
          className={`${
            mode === "light" ? "bg-gray-50" : "bg-gray-800"
          } rounded-md p-2`}
        >
          <h3 className="font-bold text-lg">Last edit</h3>
          <span className="italic text-sm">{lastEdited}</span>
        </div>
      )}
      <div
        className={`${
          mode === "light" ? "bg-gray-50" : "bg-gray-800"
        } rounded-md p-2`}
      >
        <h3 className="font-bold text-lg">Date of create</h3>
        <span className="italic text-sm">{createdAt}</span>
      </div>
      <div
        className={`${
          mode === "light" ? "bg-gray-50" : "bg-gray-800"
        } rounded-md p-2`}
      >
        <h3 className="font-bold text-lg">Author</h3>
        <span className="italic text-sm">{user.displayName}</span>
      </div>
    </div>
  );
}

export default Details;
