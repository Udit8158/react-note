import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

function EditNoteForm({
  loading,
  setEditing,
  title,
  description,
  isChecked,
  sendData,
  notes,
  id,
}) {
  const { mode } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [inputData, setInputData] = useState({ title, description, isChecked });
  const submitHandler = (event) => {
    event.preventDefault();

    if (
      inputData.title !== title ||
      inputData.description !== description ||
      inputData.isChecked !== isChecked
    ) {
      const date = new Date();
      const selected = notes.find((note) => note.id === id);
      selected.title = inputData.title;
      selected.description = inputData.description;
      selected.isChecked = inputData.isChecked;
      selected.isEdited = true;
      selected.lastEdited = date.toLocaleString();

      const filtered = notes.filter((note) => note.id !== id);
      filtered.push(selected);

      sendData({ notes: filtered }, user.uid, "Successfully edit your note");
    }
  };
  return (
    <form className="flex flex-col gap-3 " onSubmit={submitHandler}>
      <div className="flex flex-col gap-1">
        <label
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-sm font-light`}
        >
          Title
        </label>
        <input
          type="text"
          placeholder="Title"
          className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none text-black"
          value={inputData.title}
          min="1"
          onChange={(e) => {
            setInputData({ ...inputData, title: e.target.value });
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-sm font-light`}
        >
          Description
        </label>
        <textarea
          placeholder="Description"
          rows={"3"}
          className="focus:border-blue-600 outline-none border-2 p-2 text-sm rounded-md text-black"
          minLength="1"
          value={inputData.description}
          onChange={(e) => {
            setInputData({ ...inputData, description: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="favourite"
          checked={inputData.isChecked}
          onChange={(e) => {
            setInputData({ ...inputData, isChecked: e.target.checked });
          }}
        />
        <label
          htmlFor="favourite"
          className={`${
            mode === "light" ? "text-black" : "text-white"
          } text-sm font-light`}
        >
          Is favourite?
        </label>
      </div>
      <div className="flex gap-2">
        <button
          className={`text-sm py-2 px-6 border-2 rounded-lg hover:border-blue-700  `}
          onClick={() => {
            setEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm py-2 px-6 text-white bg-blue-700 hover:bg-blue-500 rounded-lg"
        >
          {loading ? "loading" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default EditNoteForm;
