import React from "react";
import { Link } from "react-router-dom";
import image from "../img/img03.svg";

function Home() {
  return (
    <div className="flex items-center mx-auto w-5/6 mt-40 md:4/6">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Best notes app for everyone!</h1>
        <p className="text-sm">Create your first Note</p>
        <div className="mt-8 w-full flex gap-3 items-center">
          <button className="text-sm py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
            <Link to="/create-new-note">Get Started</Link>
          </button>
          <button className="text-sm py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
            <Link to="/register">Log in</Link>
          </button>
        </div>
      </div>
      <div className="hidden md:block w-3/6">
        <img src={image} alt="error" />
      </div>
    </div>
  );
}

export default Home;
