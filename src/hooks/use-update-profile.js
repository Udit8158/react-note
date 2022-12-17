import {
  deleteUser,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";
import { AuthContext } from "../context/AuthContext";
import { auth, storage } from "../firebase-config";

const useUpdateProfile = () => {
  const { user, logIn, logOut } = useContext(AuthContext);
  const { toggleAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  // local state
  const [isUpdatePassword, setIsUpdatePassword] = useState(true);
  const [inputData, setInputData] = useState({ first: "", second: "" });
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

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

              setIsLoading(false);

              setTimeout(() => {
                toggleAlert("hide", null, null);
              }, 2000);
            })
            .catch((err) => {
              setIsLoading(false);
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
        setIsLoading(false);
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

    setIsLoading(true);

    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        logIn(auth.currentUser);
        navigate("/profile");
        setIsLoading(false);
        setInputData({ first: user.displayName, second: user.email });

        toggleAlert("show", "Successfully update your profile", "success");

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);

        toggleAlert(
          "show",
          "Something went wrong! Please log out and try again",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      });

    updateEmail(auth.currentUser, email)
      .then(() => {
        logIn(auth.currentUser);
        navigate("/profile");
        setIsLoading(false);
        setInputData({ first: user.displayName, second: user.email });

        toggleAlert("show", "Successfully update your profile", "success");

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);

        toggleAlert(
          "show",
          "Something went wrong! Please log out and try again",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
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

  const updateProfileImageHandler = (file) => {
    const storageRef = ref(storage, `images/${user.uid}/profile.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        toggleAlert(
          "show",
          "Successfully update your profile picture. Refresh to see.",
          "success"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error.message);

        toggleAlert(
          "show",
          "Something went wrong! Unable to delete your account",
          "error"
        );

        setTimeout(() => {
          toggleAlert("hide", null, null);
        }, 2000);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProfile(user, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log(auth.currentUser);
              logIn(auth.currentUser);
              navigate("/profile");
            })
            .catch((error) => {
              console.log(error.message);
              // ...
            });
        });
      }
    );
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
    isLoading,
    updateProfileImageHandler,
  };
};

export default useUpdateProfile;
