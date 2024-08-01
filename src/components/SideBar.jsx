import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import logo from "../assets/logo.png";
import { FaDatabase } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [styles, setStyles] = useState({ display: "hidden", width: "w-1/4" });

  const toggleBar = () => {
    setStyles({
      display: !isOpen ? "block" : "hidden",
      width: !isOpen ? "w-3/4" : "w-1/4",
    });
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${styles.display} ${styles.width} fixed lg:relative lg:block h-screen lg:w-1/4 bg-white z-40 py-6`}
      >
        <div className="flex flex-col h-full justify-between text-center items-center">
          <div>
            <div className="text-center flex flex-col items-center">
              <img src={logo} alt="logo" className="w-12" />
              <p className="font-bold text-lg">DOXA</p>
            </div>
            <ul className="mt-10">
              <NavLink
                to="/dashboard"
                onClick={isOpen ? toggleBar : ""}
                className="hover:text-textlime"
              >
                <li className="flex gap-5 mt-5 items-center">
                  <FaDatabase className="text-xl" />{" "}
                  <span className="lg:text-xl font-bold">Database</span>
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/account"
                onClick={isOpen ? toggleBar : ""}
                className="hover:text-textlime"
              >
                <li className="flex gap-5 mt-5 items-center">
                  <MdOutlineSettings className="text-xl" />{" "}
                  <span className="lg:text-xl font-bold">Account Settings</span>
                </li>
              </NavLink>
            </ul>
          </div>
          <div className="flex gap-5 mt-5 items-center justify-start w-2/4 hover:text-textlime font-bold">
            <FiLogOut className="text-lg" />
            <span className="lg:text-xl">Log out</span>
          </div>
        </div>
      </div>
      <div className="lg:hidden fixed">
        <CgMenuLeftAlt onClick={toggleBar} className="text-2xl" />
      </div>
      {isOpen && (
        <div
          onClick={toggleBar}
          className="fixed z-20 inset-0 opacity-10 bg-black"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
