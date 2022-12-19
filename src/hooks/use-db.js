import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

const useDB = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // alert
  const { toggleAlert } = useContext(AlertContext);

  const navigate = useNavigate();

  const getData = async (uid) => {
    try {
      setLoading(true);
      const dbRef = doc(db, "users", uid);
      onSnapshot(dbRef, (doc) => {
        doc.data() && setNotes(doc.data().notes);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  const sendData = async (data, uid, msg = "Successfully create your note") => {
    try {
      setLoading(true);
      const dbRef = doc(db, "users", uid);
      await setDoc(dbRef, data);
      toggleAlert("show", msg, "success");
      setLoading(false);
      navigate("/notes");

      setTimeout(() => {
        toggleAlert("hide", null, null);
      }, 2000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toggleAlert("show", "Something goes wrong", "error");
      setTimeout(() => {
        toggleAlert("hide", null, null);
      }, 2000);
    }

    // getData(uid);
  };

  const toggleTrashNote = (id) => {
    const trashedNote = notes.find((note) => note.id === id);
    trashedNote.isTrashed = !trashedNote.isTrashed;
    const filtered = notes.filter((note) => note.id !== id);
    setNotes([...filtered, trashedNote]);

    sendData({ notes }, user.uid, "Successfully trashed");
  };

  useEffect(() => {
    getData(user.uid);
  }, []);

  return { sendData, setNotes, notes, loading, toggleTrashNote };
};

export default useDB;
