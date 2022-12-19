import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import useDB from "../../hooks/use-db";
import noNotesSvg from "../../img/img05.svg";

function NoNotes() {
  // using data
  const { mode } = useContext(ThemeContext);
  const { notes } = useDB();

  return (
    <div
      className={`mt-10 ${
        mode === "light" ? "text-black" : "text-white"
      } md:mt-5`}
    >
      <img
        src={noNotesSvg}
        alt="no notes"
        className="w-4/6 mx-auto md:w-2/6 lg:1/6"
      />
      <div className="mt-3">
        <p className="text-center">No notes found</p>
      </div>
      <div className="w-4/6 mx-auto flex gap-3 mt-3 md:w-2/6 lg:1/6">
        {notes.length !== 0 && (
          <Link to="/trash-notes">
            <button
              className={`text-sm p-2 border-2 rounded-lg hover:border-blue-700  ${
                mode === "light" ? "text-black bg-white" : "text-white bg-black"
              }`}
            >
              Show trash
            </button>
          </Link>
        )}

        <button className="text-sm  mx-auto p-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
          <Link to="/create-new-note">Create new</Link>
        </button>
      </div>
    </div>
  );
}

export default NoNotes;
