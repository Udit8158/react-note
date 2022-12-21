import { doc, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase-config";

export const useData = () => {
  const { notes, setNotes } = useContext(AuthContext);
  const getData = async (uid) => {
    console.log("Call");
    // setLoading(true);
    try {
      const dbRef = doc(db, "users", uid);
      onSnapshot(dbRef, (doc) => {
        doc.data() && setNotes(() => doc.data().notes);
        // setLoading(false);
      });
    } catch (err) {
      //   setLoading(false);
      console.log(err.message);
    }
  };

  return { getData };
};
