import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logInSvg from "../img/img02.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { user, logIn, isLoggedIn } = useContext(AuthContext);
  //   console.log(user);
  //   console.log(isLoggedIn);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    // sign up new user

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;

        // update name of the user
        updateProfile(currentUser, { displayName: name });

        logIn(currentUser);
        navigate("/");
      })

      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div className="flex w-full mx-auto items-center  mt-20">
      <div className="flex flex-col w-5/6 mx-auto gap-7  lg:w-3/6 lg:px-4">
        <h1 className="text-2xl font-bold">Create new account!</h1>
        <form className="flex flex-col gap-3 " onSubmit={submitHandler}>
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
              ref={nameInputRef}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
              ref={emailInputRef}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
              ref={passwordInputRef}
            />
          </div>
          <div>
            <Link to={"/login"}>
              <p className="text-blue-600 text-sm hover:underline">
                Do you have an account? Log in
              </p>
            </Link>
          </div>
          <button
            type="submit"
            className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg"
          >
            Create account
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
