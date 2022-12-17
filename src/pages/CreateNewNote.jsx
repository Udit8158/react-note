import React, { useContext, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext";
import imageSvg from "../img/img01.svg";

function CreateNewNote() {
  const emailInputRef = useRef();

  const mode = useContext(ThemeContext).mode;
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
        <form className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-1">
            <label
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-sm font-light`}
            >
              Title
            </label>
            <input
              type="email"
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
            ></textarea>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" id="favourite" />
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
            Create new note
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
