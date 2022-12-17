import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import image from "../img/img03.svg";

function Home() {
  const mode = useContext(ThemeContext).mode;
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="flex items-center mx-auto w-5/6 mt-40 md:4/6">
      <div className="flex flex-col">
        <h1
          className={`font-bold text-xl ${
            mode === "light" ? "text-black" : "text-white"
          } duration-500`}
        >
          Best notes app for everyone!
        </h1>
        <p
          className={`text-sm ${
            mode === "light" ? "text-black" : "text-white"
          } duration-500`}
        >
          Create your first Note
        </p>
        <div className="mt-8 w-full flex gap-3 items-center">
          {isLoggedIn && (
            <button className="text-sm py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
              <Link to="/create-new-note">Get Started</Link>
            </button>
          )}
          {!isLoggedIn && (
            <button className="text-sm py-2 px-4 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
              <Link to="/register">Log in</Link>
            </button>
          )}
        </div>
      </div>
      <div className="hidden md:block w-3/6">
        <img src={image} alt="error" />
      </div>
    </div>
  );
}

export default Home;
