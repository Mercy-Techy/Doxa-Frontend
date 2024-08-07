import React, { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FiAlignLeft } from "react-icons/fi";

const HomeSidebar = ({ scrollToSection, aboutUsRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("hidden");

  const toggleBar = () => {
    setDisplay(() => (isOpen ? "hidden" : "block"));
    return setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`${display} w-3/4 fixed h-screen bg-white z-40 py-6 text-black left-0 top-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" className="w-12" />
              <p className="font-bold text-lg">DOXA</p>
            </div>
            <ul className="mt-10 pl-10">
              <li className="text-lg font-bold uppercase my-4">
                <NavLink onClick={toggleBar}>Home</NavLink>
              </li>
              <li className="text-lg font-bold uppercase my-4">
                <NavLink
                  onClick={() => {
                    scrollToSection(aboutUsRef);
                    return toggleBar();
                  }}
                >
                  About Us
                </NavLink>
              </li>
              <li className="text-lg font-bold uppercase my-4">
                <NavLink to="/login" onClick={toggleBar}>
                  Log In
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="md:hidden flex justify-between ">
        <img src={logo} alt="logo" className="w-12" />
        <FiAlignLeft onClick={toggleBar} className="text-4xl text-white" />
      </div>
      {isOpen && (
        <div
          onClick={toggleBar}
          className="fixed z-20 inset-0 opacity-20 bg-black"
        ></div>
      )}
    </>
  );
};

export default HomeSidebar;
