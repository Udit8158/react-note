import {
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "./context/AlertContext";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { auth } from "./firebase-config";
import ProfileSvg from "./img/img04.svg";

function Profile() {
  const mode = useContext(ThemeContext).mode;
  const { user, logIn } = useContext(AuthContext);
  const { toggleAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  // local state
  const [isUpdatePassword, setIsUpdatePassword] = useState(true);
  const [inputData, setInputData] = useState({ first: "", second: "" });
  console.log();
  console.log(inputData);

  // func
  const updatePasswordHandler = () => {
    const oldPassword = inputData.first;
    const newPassword = inputData.second;

    setInputData({ first: "", second: "" });

    if (newPassword.length < 6) {
      toggleAlert("show", "Password should be more than 5 charecter", "error");

      setTimeout(() => {
        toggleAlert("hide", null, null);
      }, 2000);
    }

    // if old and new password are same then no change
    if (oldPassword === newPassword) {
      toggleAlert("show", "New password can not be same as old one", "error");

      setTimeout(() => {
        toggleAlert("hide", null, null);
      }, 2000);
      return;
    }

    const currenUserUid = user.uid;
    const email = user.email;

    // check the old password and if correct then set new password
    signInWithEmailAndPassword(auth, email, oldPassword)
      .then((userCredential) => {
        const uid = userCredential.user.uid;

        if (currenUserUid === uid) {
          // means user change its own password

          updatePassword(userCredential.user, newPassword)
            .then(() => {
              toggleAlert(
                "show",
                "Successfully reset your password",
                "success"
              );

              setTimeout(() => {
                toggleAlert("hide", null, null);
              }, 2000);
            })
            .catch((err) => {
              toggleAlert(
                "show",
                "Something went wrong! Check your credentials",
                "error"
              );

              setTimeout(() => {
                toggleAlert("hide", null, null);
              }, 2000);
            });
        }
      })
      .catch((e) => {
        console.log(e.message);

        toggleAlert(
          "show",
          "Something went wrong! Check your credentials",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      });
  };

  const updateUserProfileHandler = () => {
    const name = inputData.first;
    const email = inputData.second;
    setInputData({ first: "", second: "" });

    updateProfile(auth.currentUser, { displayName: name, email })
      .then(() => {
        console.log(auth.currentUser);
        logIn(auth.currentUser);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    isUpdatePassword ? updatePasswordHandler() : updateUserProfileHandler();
  };
  return (
    <div className="flex md:w-5/6 md:mx-auto">
      <div
        className={`w-5/6 mx-auto flex flex-col mt-16 gap-4 ${
          mode === "light" ? "text-black" : "text-white"
        } lg:w-3/6`}
      >
        <div>
          <h1 className={`text-2xl font-bold `}>Your Profile</h1>
        </div>
        {/* Profile */}

        <div className="flex justify-center items-center mt-8">
          <img
            src={
              "https://us.123rf.com/450wm/afe207/afe2071602/afe207160200158/52329668-m%C4%99%C5%BCczyzna-obraz-profilu-awatara-cie%C5%84-sylwetka-%C5%9Bwiat%C5%82a.jpg?ver=6"
            }
            alt="profile picture"
            className="w-32 rounded-full border-blue-500 border-2"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold ">{user.displayName}</h2>
          <p className="text-sm font-normal">{user.email}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <div className="flex gap-2 mt-2">
            <button
              className={`text-sm ${
                mode === "light" ? "bg-gray-200" : "bg-gray-900"
              }  p-2 ${isUpdatePassword && "text-blue-700"}`}
              onClick={() => {
                setIsUpdatePassword(true);
                setInputData({ first: "", second: "" });
              }}
            >
              CHANGE PASSWORD
            </button>
            <button
              className={`text-sm ${
                mode === "light" ? "bg-gray-200" : "bg-gray-900"
              }  p-2 ${!isUpdatePassword && "text-blue-700"}`}
              onClick={() => {
                setIsUpdatePassword(false);
                setInputData({ first: user.displayName, second: user.email });
              }}
            >
              EDIT USER PROFILE
            </button>
          </div>

          {/* form */}

          <form
            className="flex flex-col gap-3 mt-8 mb-2 "
            onSubmit={submitHandler}
          >
            <div className="flex flex-col gap-1">
              <label
                className={`${
                  mode === "light" ? "text-black" : "text-white"
                } text-sm font-light `}
              >
                {isUpdatePassword ? "Your actual password" : "Your name"}
              </label>
              <input
                type={isUpdatePassword ? "password" : "text"}
                placeholder={
                  isUpdatePassword ? "Your actual password" : "Your name"
                }
                className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
                onChange={(e) => {
                  setInputData({ ...inputData, first: e.target.value });
                }}
                value={inputData.first}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className={`${
                  mode === "light" ? "text-black" : "text-white"
                } text-sm font-light`}
              >
                {isUpdatePassword ? "Your new password" : "Your email"}
              </label>
              <input
                type={isUpdatePassword ? "password" : "email"}
                placeholder={
                  isUpdatePassword ? "Your new password" : "Your email"
                }
                className=" border-2 p-2 text-sm rounded-md focus:border-blue-600 outline-none"
                onChange={(e) => {
                  setInputData({ ...inputData, second: e.target.value });
                }}
                value={inputData.second}
              />
            </div>

            <button
              type="submit"
              className="text-sm py-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg"
            >
              {isUpdatePassword ? "Update password" : "Update profile"}
            </button>
          </form>

          <div className="mt-8 mb-2 ">
            <h1 className="text-2xl font-bold">Account management</h1>
            <div className="flex justify-start items-center gap-2 mt-4">
              <button
                className={`text-sm p-2 border-2 rounded-lg hover:border-blue-700  ${
                  mode === "light"
                    ? "text-black bg-white"
                    : "text-white bg-black"
                }`}
              >
                Delete account
              </button>
              <button className="text-sm p-2 text-white bg-blue-700 hover:bg-blue-500 rounded-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-0 lg:w-3/6">
        <img src={ProfileSvg} />
      </div>
    </div>
  );
}

export default Profile;
