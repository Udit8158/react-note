import {
  deleteUser,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase-config";

const useUpdateProfile = () => {
  const { user, logIn, logOut } = useContext(AuthContext);
  const { toggleAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  // local state
  const [isUpdatePassword, setIsUpdatePassword] = useState(true);
  const [inputData, setInputData] = useState({ first: "", second: "" });

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

  const deleUserHandler = () => {
    deleteUser(user)
      .then(() => {
        toggleAlert("show", "Successfully delete your account", "error");

        logOut();
        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      })
      .catch((error) => {
        // An error ocurred
        // ...
        toggleAlert(
          "show",
          "Something went wrong! Unable to delete your account",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      });
  };

  return {
    updatePasswordHandler,
    updateUserProfileHandler,
    isUpdatePassword,
    setIsUpdatePassword,
    inputData,
    setInputData,
    user,
    logOut,
    deleUserHandler,
  };
};

export default useUpdateProfile;
