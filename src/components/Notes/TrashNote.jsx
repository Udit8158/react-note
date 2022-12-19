import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function TrashNote({ title, description, deleteNote, id, toggleTrashNote }) {
  const { mode } = useContext(ThemeContext);
  return (
    <div
      className={`${
        mode === "light" ? "bg-gray-100" : "bg-gray-900"
      } flex flex-col gap-2 p-2 rounded-lg ${
        mode === "light" ? "text-black" : "text-white"
      } duration-500`}
    >
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm">{description}</p>
      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          className="text-sm  text-white bg-blue-700 hover:bg-blue-500 rounded-lg py-2 px-6"
          onClick={() => {
            deleteNote(id);
          }}
        >
          Delete
        </button>
        <button
          className={`text-sm py-2 px-6 border-2 rounded-lg hover:border-blue-700  `}
          onClick={() => {
            toggleTrashNote(id);
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
}

export default TrashNote;
