import { MdNotes, MdOutlineToggleOff, MdFavoriteBorder } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegTrashAlt, FaToggleOn } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleMode } = useContext(ThemeContext);
  // console.log(mode);

  return (
    <div
      className={`${mode === "light" ? "bg-gray-200" : "bg-gray-900"} ${
        isOpen ? "w-56" : "w-16"
      } min-h-screen flex flex-col gap-14 p-2 ${isOpen && "fixed left-0"} ${
        mode === "light" && "border-r-2 border-gray-300 "
      } duration-500`}
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
        <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
          <IoIosAdd
            className={`text-${mode === "light" ? "black" : "white"}`}
            size={30}
          />

          <p
            className={`text-${mode === "light" ? "black" : "white"} ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Create New
          </p>
        </div>
        <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
          <MdNotes
            className={`text-${mode === "light" ? "black" : "white"}`}
            size={30}
          />
          {isOpen && (
            <p className={`text-${mode === "light" ? "black" : "white"}`}>
              Notes
            </p>
          )}
        </div>
        <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
          <FaRegTrashAlt
            className={`text-${mode === "light" ? "black" : "white"}`}
            size={30}
          />
          {isOpen && (
            <p className={`text-${mode === "light" ? "black" : "white"}`}>
              Trash
            </p>
          )}
        </div>

        <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
          <MdFavoriteBorder
            className={`text-${mode === "light" ? "black" : "white"}`}
            size={30}
          />
          {isOpen && (
            <p className={`text-${mode === "light" ? "black" : "white"}`}>
              Favourite
            </p>
          )}
        </div>
        <Link to={"/register"}>
          <div className="flex  items-center gap-2 hover:bg-slate-400 py-2 px-3 cursor-pointer rounded-sm">
            <AiOutlineUser
              className={`text-${mode === "light" ? "black" : "white"}`}
              size={30}
            />
            {isOpen && (
              <p className={`text-${mode === "light" ? "black" : "white"}`}>
                Login
              </p>
            )}
          </div>
        </Link>

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
    </div>
  );
}

export default Sidebar;
