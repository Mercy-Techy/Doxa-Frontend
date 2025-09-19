import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import logo from "../assets/logo.png";
import { FaDatabase } from "react-icons/fa6";
import {
  MdArrowDropDown,
  MdOutlineArrowDownward,
  MdOutlineSettings,
} from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { fetchDatabase } from "../http";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowRight } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [styles, setStyles] = useState({ display: "hidden", width: "w-1/4" });
  const navigate = useNavigate();
  const { isError, data, isSuccess, isPending } = useQuery({
    queryFn: () => fetchDatabase(1),
    queryKey: ["database", 1],
  });

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
        className={`${styles.display} ${styles.width} fixed lg:relative lg:block h-screen lg:w-1/4 bg-white z-40 p-6`}
      >
        <div className="flex flex-col h-full justify-between ">
          <div>
            <div className="text-center flex flex-col items-center">
              <img src={logo} alt="logo" className="w-12" />
              <p className="font-bold text-lg">DOXA</p>
            </div>
            <ul className="mt-16">
              <li className="flex gap-5 hover:bg-bggray py-1 rounded-md">
                <div>
                  {!open && (
                    <MdOutlineArrowRight
                      className="text-3xl"
                      onClick={() => setOpen(true)}
                    />
                  )}
                  {open && (
                    <MdArrowDropDown
                      className="text-3xl"
                      onClick={() => setOpen(false)}
                    />
                  )}
                </div>
                <div>
                  <NavLink to="/dashboard" onClick={isOpen ? toggleBar : ""}>
                    <div className="flex gap-1 items-center">
                      <FaDatabase className="text-md" />{" "}
                      <span className="lg:text-xl font-semibold">Database</span>
                    </div>
                  </NavLink>
                  {open && (
                    <div>
                      {data?.data?.map((db) => (
                        <div
                          key={db._id}
                          className="capitalize text-black mt-1"
                        >
                          <Link to={db?._id}>{db?.name}</Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              <li className="hover:bg-bggray mt-4 py-1 rounded-md">
                <NavLink
                  to="/dashboard/account"
                  onClick={isOpen ? toggleBar : ""}
                >
                  <div className="flex gap-1 items-center ml-12">
                    <MdOutlineSettings className="text-md" />{" "}
                    <span className="lg:text-xl font-semibold">Account</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="mt-5 hover:bg-bggray py-1 rounded-md font-semibold cursor-pointer"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <div className="ml-12 flex items-center gap-1">
              <FiLogOut className="text-md" />
              <span className="lg:text-xl font-semibold">Log out</span>
            </div>
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
