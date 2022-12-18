import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

const useDB = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  // alert
  const { toggleAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const getData = async (uid) => {
    const dbRef = doc(db, "users", user.uid);
    // const res = await getDoc(dbRef);

    // setNotes(res.data().notes);

    // Real time update
    try {
      onSnapshot(dbRef, (doc) => {
        doc.data() && setNotes(doc.data().notes);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendData = async (data, uid) => {
    const dbRef = doc(db, "users", uid);
    await setDoc(dbRef, data);
    toggleAlert("show", "Successfully create your note", "success");

    // getData(uid);
    navigate("/notes");

    setTimeout(() => {
      toggleAlert("hide", null, null);
    }, 2000);
  };

  useEffect(() => {
    getData(user.uid);
  }, []);

  return { sendData, setNotes, notes };
};

export default useDB;
