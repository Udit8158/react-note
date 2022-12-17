import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logInSvg from "../img/img02.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { AlertContext } from "../context/AlertContext";

function Register() {
  // Refs
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // contexts
  const { logIn } = useContext(AuthContext);
  const mode = useContext(ThemeContext).mode;
  const { toggleAlert } = useContext(AlertContext);

  // local state
  const [isLoading, setIsLoading] = useState(false);

  // submit func
  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    // sign up new user
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        console.log(currentUser);
        logIn(currentUser);
        setIsLoading(false);
        toggleAlert("show", "Successfully logged in", "success");

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      })
      .catch((e) => {
        console.log(e.message);

        setIsLoading(false);

        toggleAlert(
          "show",
          "Some thing went wrong! check your credentials",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      });
  };
  return (
    <div className="flex w-full mx-auto items-center mt-20">
      <div className="flex flex-col w-5/6 mx-auto gap-7  lg:w-3/6 lg:px-4">
        <h1
          className={`text-2xl font-bold duration-500 ${
            mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Log in to your account!
        </h1>
        <form className="flex flex-col gap-3 " onSubmit={submitHandler}>
          <div className="flex flex-col gap-1">
            <label
              className={`${
                mode === "light" ? "text-black" : "text-white"
              } text-sm font-light`}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Your email"
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
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
              ref={passwordInputRef}
            />
          </div>
          <div>
            <Link to={"/register"}>
              <p className="text-blue-600 text-sm hover:underline">
                Do you not have an account? Create one
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg"
          >
            {isLoading ? "loading" : "Log in"}
          </button>
        </form>
      </div>

      <div className="w-0 lg:w-3/6">
        <img src={logInSvg} alt="error" />
      </div>
    </div>
  );
}

export default Register;
