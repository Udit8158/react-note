import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

function DetailNote({ title, description, setEditing }) {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100" : "bg-gray-900"
      } flex flex-col gap-2 p-2 rounded-lg ${
        mode === "light" ? "text-black" : "text-white"
      } duration-500 `}
    >
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
      <div className="flex gap-3 mt-5">
        <button className="text-sm  text-white bg-blue-700 hover:bg-blue-500 rounded-lg py-2 px-6">
          <Link to={`/notes`}>Back</Link>
        </button>
        <button
          className={`text-sm py-2 px-6 border-2 rounded-lg hover:border-blue-700  `}
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default DetailNote;
