import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import noTrashNotesSvg from "../../img/img06.svg";

function NoTrashNote() {
  // using data
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className={`mt-10 ${
        mode === "light" ? "text-black" : "text-white"
      } md:mt-5 lg:mt-3`}
    >
      <img
        src={noTrashNotesSvg}
        alt="no notes"
        className="w-4/6 mx-auto md:w-2/6 lg:1/12"
      />
      <div className="mt-3">
        <p className="text-center font-bold text-xl">Trash is empty</p>
      </div>
      <div className="w-4/6 mx-auto justify-center flex gap-3 mt-3 md:w-2/6 ">
        <button className="text-xs   p-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
          <Link to="/create-new-note">Create new</Link>
        </button>
      </div>
    </div>
  );
}

export default NoTrashNote;
