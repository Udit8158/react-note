import React from "react";
import Sidebar from "../UI/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-screen">{children}</div>
    </div>
  );
}

export default Layout;
