import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Layout/Spinner";
import NoNotes from "../components/Notes/NoNotes";
import Note from "../components/Notes/Note";
import { ThemeContext } from "../context/ThemeContext";
import useDB from "../hooks/use-db";
import { AiOutlineSearch } from "react-icons/ai";

function Notes() {
  // context
  const { mode } = useContext(ThemeContext);
  // data form useDB
  const { notes, toggleTrashNote, loading } = useDB();

  // local state
  const [filteredNotes, setFilteredNotes] = useState([]);

  // setting up filtered notes on every notes change
  useEffect(() => {
    setFilteredNotes(notes.filter((note) => note.isTrashed === false));
  }, [notes]);
  // console.log(notes);

  // search func
  const searchHandler = (input) => {
    if (input.trim().length !== 0) {
      const filteredNotesInSearch = filteredNotes.filter((note) =>
        note.title.toLowerCase().includes(input.trim().toLowerCase())
      );
      setFilteredNotes(filteredNotesInSearch);
    } else {
      setFilteredNotes(notes.filter((note) => note.isTrashed === false));
    }
  };

  return (
    <div
      className={`${mode === "light" ? "text-black" : "text-white"} mt-14 ${
        filteredNotes.length > 0 ? "w-11/12" : "w-full"
      } mx-auto flex flex-col md:w-10/12 lg:w-11/12 duration-500 md:mt-10`}
    >
      {notes && (
        <div>
          <div className="md:flex md:justify-between items-center">
            {/* heading */}
            <div className="flex justify-center gap-1 items-center ">
              <h1 className="text-2xl font-bold">Notes</h1>
              <span className="inline-flex justify-center items-center p-3 w-4 h-4 text-xs font-bold text-white bg-blue-700 rounded-full">
                {filteredNotes.length}
              </span>
            </div>
            {/* search */}

            <div className="flex flex-col gap-3 mt-5 md:flex-row items-center">
              <div className="flex items-center relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search notes "
                  className="outline-none text-black p-2 text-sm border-2 border-white rounded-md focus:border-blue-500 bg-gray-100 focus:w-60 md:focus:w-80 duration-300"
                  onChange={(e) => {
                    searchHandler(e.target.value);
                  }}
                />
                <label htmlFor="search" className="absolute right-2">
                  <AiOutlineSearch />
                </label>
              </div>
              <button
                type="submit"
                className="text-sm py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded-lg md:px-4"
              >
                {"Trash all"}
              </button>
            </div>
          </div>
          {loading && <Spinner />}

          {/* Notes */}
          {!loading &&
            (filteredNotes.length > 0 ? (
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
            ) : (
              <NoNotes />
            ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
