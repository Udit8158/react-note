import React, { useContext, useEffect, useState } from "react";
import Note from "../components/Notes/Note";
import { ThemeContext } from "../context/ThemeContext";
import useDB from "../hooks/use-db";

function Notes() {
  const { mode } = useContext(ThemeContext);
  const { notes, toggleTrashNote } = useDB();

  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    setFilteredNotes(notes.filter((note) => note.isTrashed === false));
  }, [notes]);
  console.log(notes);

  const searchHandler = (input) => {
    if (input.trim().length !== 0) {
      console.log(input);
      const filteredNotesInSearch = notes.filter((note) =>
        note.title.toLowerCase().includes(input.trim().toLowerCase())
      );
      setFilteredNotes(filteredNotesInSearch);
    } else {
      setFilteredNotes(notes);
    }
  };

  return (
    <div
      className={`${
        mode === "light" ? "text-black" : "text-white"
      } mt-14 w-11/12 mx-auto flex flex-col md:w-10/12 lg:w-11/12 duration-500`}
    >
      <div>
        <div className="md:flex md:justify-between items-center">
          {/* heading */}
          <div className="flex justify-center gap-1 items-center ">
            <h1 className="text-2xl font-bold">Notes</h1>
            <span className="inline-flex justify-center items-center p-3 w-4 h-4 text-xs font-bold text-white bg-blue-700 rounded-full">
              {notes.length}
            </span>
          </div>
          {/* search */}
          <div className="flex flex-col gap-3 mt-5 md:flex-row ">
            <input
              type="text"
              placeholder="Search notes "
              className="outline-none p-2 text-sm border-2 border-white rounded-md focus:border-blue-500"
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
            />
            <button
              type="submit"
              className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg md:px-4"
            >
              {"Trash all"}
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => {
            return (
              <Note
                key={note.id}
                title={note.title}
                description={note.description}
                id={note.id}
                toggleTrashNote={toggleTrashNote}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notes;
