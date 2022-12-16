import React from "react";
import { Link } from "react-router-dom";
import logInSvg from "../img/img02.svg";

function Login() {
  return (
    <div className="flex w-full mx-auto items-center  mt-20">
      <div className="flex flex-col w-5/6 mx-auto gap-7  lg:w-3/6 lg:px-4">
        <h1 className="text-2xl font-bold">Log in to your account!</h1>
        <form className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              placeholder="Your email"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
            />
          </div>
          <div>
            <Link to={"/register"}>
              <p className="text-blue-600 text-sm hover:underline">
                Do you not have an account? Register
              </p>
            </Link>
          </div>
          <button className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
            Log in
          </button>
        </form>
      </div>

      <div className="w-0 lg:w-3/6">
        <img src={logInSvg} alt="error" />
      </div>
    </div>
  );
}

export default Login;
