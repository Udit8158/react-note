import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Layout/Spinner";
import DetailNote from "../components/NoteDetail/DetailNote";
import Details from "../components/NoteDetail/Details";
import EditNoteForm from "../components/NoteDetail/EditNoteForm";
import { ThemeContext } from "../context/ThemeContext";
import useDB from "../hooks/use-db";

function NoteDetail() {
  const mode = useContext(ThemeContext).mode;
  const params = useParams();

  const { notes, loading, sendData } = useDB();

  // Local state
  const [selectedNote, setSelectedNote] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const note = notes.find((note) => note.id === params.id);
    // console.log("in");
    setSelectedNote(note);
  }, [notes]);

  return (
    <div
      className={`${
        mode === "light" ? "text-black" : "text-white"
      } mt-7 w-11/12 mx-auto flex flex-col md:w-10/12 lg:w-11/12 duration-500 md:mt-14 md:flex-row md:gap-5`}
    >
      {loading && <Spinner />}
      {selectedNote && !loading && (
        <div className="md:w-8/12">
          <h1 className="text-2xl font-bold mb-7">Manage your notes</h1>

          {!editing ? (
            <DetailNote
              title={selectedNote.title}
              description={selectedNote.description}
              setEditing={setEditing}
            />
          ) : (
            <EditNoteForm
              loading={loading}
              setEditing={setEditing}
              title={selectedNote.title}
              description={selectedNote.description}
              isChecked={selectedNote.isChecked}
              sendData={sendData}
              notes={notes}
              id={selectedNote.id}
            />
          )}
        </div>
      )}

      {/* Details */}
      {selectedNote && !loading && (
        <div className="mt-10 md:mt-0 md:w-4/12">
          <h2 className="text-2xl font-bold mb-7">Details</h2>
          <Details
            createdAt={selectedNote.createdAt}
            isEdited={selectedNote.isEdited}
            lastEdited={selectedNote.lastEdited ? selectedNote.lastEdited : ""}
          />
        </div>
      )}
    </div>
  );
}

export default NoteDetail;
