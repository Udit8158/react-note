import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "../context/AlertContext";

const useDB = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(notes);
  // alert
  const { toggleAlert } = useContext(AlertContext);

  const navigate = useNavigate();
  const location = useLocation();

  const getData = async (uid) => {
    // console.log("calling");
    setLoading((prev) => !prev);
    try {
      const dbRef = doc(db, "users", uid);
      onSnapshot(dbRef, (doc) => {
        doc.data() && setNotes(() => doc.data().notes);
        setLoading((prev) => !prev);
      });
    } catch (err) {
      setLoading((prev) => !prev);
      console.log(err.message);
    }
  };

  const sendData = async (data, uid, msg = "Successfully create your note") => {
    setLoading((prev) => !prev);
    try {
      const dbRef = doc(db, "users", uid);
      await setDoc(dbRef, data);
      toggleAlert("show", msg, "success");
      setLoading((prev) => !prev);
      // console.log(location);

      // only navigate to notes if the user in the create note page
      if (location.pathname === "/create-new-note") {
        navigate("/notes");
      }

      setTimeout(() => {
        toggleAlert("hide", null, null);
      }, 2000);
    } catch (err) {
      console.log(err);
      setLoading((prev) => !prev);
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

    sendData({ notes }, user.uid, "successful");
  };

  const toggleTrashAll = () => {
    const allFiltered = notes;
    allFiltered.map((note) => (note.isTrashed = !note.isTrashed));

    sendData({ notes: allFiltered }, user.uid, "successfully trashed all");
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);

    sendData({ notes: filtered }, user.uid, "successfully deleted");
  };

  const deleteAllNote = () => {
    setNotes([]);
    sendData({ notes: [] }, user.uid, "successfully deleted all notes");
  };

  const toggleFavourite = (id) => {
    const trashedNote = notes.find((note) => note.id === id);
    trashedNote.isChecked = !trashedNote.isChecked;
    const filtered = notes.filter((note) => note.id !== id);
    setNotes([...filtered, trashedNote]);

    sendData({ notes }, user.uid, "successfuly unfavourite note");
  };

  const unfavouriteAll = () => {
    // console.log(notes);
    const filtered = notes;
    // console.log(filtered);
    filtered.map((note) => (note.isChecked = false));

    sendData({ notes: filtered }, user.uid, "successfuly unfavourite all");
  };

  useEffect(() => {
    getData(user.uid);
    // console.log("effec");
  }, []);

  return {
    sendData,
    setNotes,
    notes,
    loading,
    toggleTrashNote,
    toggleTrashAll,
    deleteNote,
    deleteAllNote,
    toggleFavourite,
    unfavouriteAll,
  };
};

export default useDB;
