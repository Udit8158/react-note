import { MdNotes, MdOutlineToggleOff, MdFavoriteBorder } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegTrashAlt, FaToggleOn } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AlertContext } from "../../context/AlertContext";

function Sidebar({ isOpen, setIsOpen }) {
  const { mode, toggleMode } = useContext(ThemeContext);
  const { logOut, isLoggedIn } = useContext(AuthContext);
  const { toggleAlert } = useContext(AlertContext);

  const logOutHandler = () => {
    logOut();
    toggleAlert("show", "Successfully logout", "success");

    setTimeout(() => {
      toggleAlert("hide", null, null);
    }, 2000);
  };

  const sideBarItems = [
    {
      path: "/create-new-note",
      icon: (
        <IoIosAdd
          className={`text-${mode === "light" ? "black" : "white"}`}
          size={30}
        />
      ),
      text: "Create new note",
    },
    {
      path: "/notes",
      icon: (
        <MdNotes
          className={`text-${mode === "light" ? "black" : "white"}`}
          size={30}
        />
      ),
      text: "Notes",
    },
    {
      path: "/trash-notes",
      icon: (
        <FaRegTrashAlt
          className={`text-${mode === "light" ? "black" : "white"}`}
          size={30}
        />
      ),
      text: "Trash notes",
    },
    {
      path: "/favourite-notes",
      icon: (
        <MdFavoriteBorder
          className={`text-${mode === "light" ? "black" : "white"}`}
          size={30}
        />
      ),
      text: "Favourite notes",
    },
    {
      path: `${isLoggedIn ? "/profile" : "/register"}`,
      icon: (
        <AiOutlineUser
          className={`text-${mode === "light" ? "black" : "white"}`}
          size={30}
        />
      ),
      text: "Login",
    },
  ];

  return (
    <div
      className={`duration-500 ${
        mode === "light" ? "bg-gray-50" : "bg-gray-900"
      } ${isOpen ? "w-56" : "w-16"} min-h-screen flex flex-col gap-14 p-2 ${
        isOpen && "fixed left-0 z-50"
      }  `}
    >
      <div className="flex gap-3 items-center">
        <GiHamburgerMenu
          className={`text-${
            mode === "light" ? "black" : "white"
          } cursor-pointer ml-2`}
          size={30}
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link to="/">
          <p
            className={`text-${
              mode === "light" ? "black" : "white"
            } text-2xl font-serif ${!isOpen && "hidden"} ${
              isOpen && "w - auto"
            } duration-500`}
          >
            React Todo
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {sideBarItems.map((item) => {
          return (
            <Link to={item.path}>
              <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
                {item.icon}
                {isOpen && (
                  <p className={`text-${mode === "light" ? "black" : "white"}`}>
                    {item.text}
                  </p>
                )}
              </div>
            </Link>
          );
        })}

        <div
          className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm"
          onClick={() => toggleMode(mode)}
        >
          {mode === "light" && (
            <MdOutlineToggleOff
              className={`text-${mode === "light" ? "black" : "white"}`}
              size={30}
            />
          )}
          {mode === "dark" && (
            <FaToggleOn
              className={`text-${mode === "light" ? "black" : "white"}`}
              size={30}
            />
          )}
          {isOpen && (
            <p className={`text-${mode === "light" ? "black" : "white"}`}>
              {mode === "light" ? "Light Mode" : "Dark Mode"}
            </p>
          )}
        </div>
      </div>
      <div
        className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm"
        onClick={logOutHandler}
      >
        <FiLogOut
          size={30}
          className={`text-${mode === "light" ? "black" : "white"}`}
        />
        {isOpen && (
          <p className={`text-${mode === "light" ? "black" : "white"}`}>
            Log out
          </p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
