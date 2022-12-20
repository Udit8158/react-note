import React, { useContext, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import useDB from "../hooks/use-db";
import imageSvg from "../img/img01.svg";

function CreateNewNote() {
  // Refs
  const emailInputRef = useRef();
  const descriptionInputRef = useRef();
  const favouriteInputRef = useRef();

  // Contexts
  const mode = useContext(ThemeContext).mode;
  const { user } = useContext(AuthContext);

  // using useDB hook custom
  const { sendData, notes, setNotes, loading } = useDB();
  // console.log(notes);
  const arr = notes;

  // create new note on submit
  const submitHandler = (e) => {
    e.preventDefault();
    const id = Math.random().toString();
    const date = new Date();

    const data = {
      title: emailInputRef.current.value,
      description: descriptionInputRef.current.value,
      isChecked: favouriteInputRef.current.checked,
      isTrashed: false,
      createdAt: date.toLocaleString(),
      id,
      isEdited: false,
    };
    arr.push(data);

    setNotes(arr);
    sendData({ notes }, user.uid);
  };
  return (
    <div className="flex w-full mx-auto items-center mt-20">
      <div className="flex flex-col w-5/6 mx-auto gap-7  lg:w-3/6 lg:px-4">
        <h1
          className={`text-2xl font-bold duration-500 ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Create new note
        </h1>
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
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
              ref={emailInputRef}
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
              className="focus:border-blue-600 outline-none border-2 p-2 text-sm rounded-md"
              ref={descriptionInputRef}
              minLength="1"
            ></textarea>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" id="favourite" ref={favouriteInputRef} />
            <label
              htmlFor="favourite"
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-sm font-light`}
            >
              Is favourite?
            </label>
          </div>
          <button
            type="submit"
            className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg"
          >
            {loading ? "loading" : "Create new note"}
          </button>
        </form>
      </div>

      <div className="w-0 lg:w-2/6">
        <img src={imageSvg} alt="error" />
      </div>
    </div>
  );
}

export default CreateNewNote;
