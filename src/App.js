import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNewNote from "./pages/CreateNewNote";
import Notes from "./pages/Notes";
import FavouriteNotes from "./pages/FavouriteNotes";
import TrashNotes from "./pages/TrashNotes";
import Profile from "./Profile";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
          {isLoggedIn && (
            <Route path="/create-new-note" element={<CreateNewNote />} />
          )}
          {isLoggedIn && <Route path="/notes" element={<Notes />} />}
          {isLoggedIn && (
            <Route path="/favourite-notes" element={<FavouriteNotes />} />
          )}
          {isLoggedIn && <Route path="/trash-notes" element={<TrashNotes />} />}
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
