import { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import logo from "../assets/logo.png";
import { MdOutlineSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [styles, setStyles] = useState({ display: "hidden", width: "w-1/5" });
  const navigate = useNavigate();

  const toggleBar = () => {
    setStyles({
      display: !isOpen ? "block" : "hidden",
      width: !isOpen ? "w-3/4" : "w-1/5",
    });
    return setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${styles.display} ${styles.width} fixed lg:relative lg:block h-screen lg:w-1/5 bg-white z-40 p-6`}
      >
        <div className="flex flex-col h-full justify-between ">
          <div>
            <div className="text-center flex flex-col items-center">
              <img src={logo} alt="logo" className="w-12" />
              <p className="font-bold text-lg">DOXA</p>
            </div>
            <ul className="mt-16">
              <li className="hover:bg-bggray mt-4 py-1 rounded-md">
                <NavLink
                  to="/admin-dashboard"
                  onClick={isOpen ? toggleBar : ""}
                >
                  <div className="flex gap-3 items-center ml-12">
                    <BiHomeAlt2 className="text-xl" />{" "}
                    <span className="lg:text-lg font-semibold">Dashboard</span>
                  </div>
                </NavLink>
              </li>
              <li className="hover:bg-bggray mt-4 py-1 rounded-md">
                <NavLink
                  to="/admin-dashboard/users"
                  onClick={isOpen ? toggleBar : ""}
                >
                  <div className="flex gap-3 items-center ml-12">
                    <FaRegUser className="text-xl" />{" "}
                    <span className="lg:text-lg font-semibold">All User</span>
                  </div>
                </NavLink>
              </li>
              <li className="hover:bg-bggray mt-4 py-1 rounded-md">
                <NavLink
                  to="/admin-dashboard/dbs"
                  onClick={isOpen ? toggleBar : ""}
                >
                  <div className="flex gap-3 items-center ml-12">
                    <FaRegUser className="text-xl" />{" "}
                    <span className="lg:text-lg font-semibold">
                      All Databases
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="hover:bg-bggray mt-4 py-1 rounded-md">
                <NavLink
                  to="/admin-dashboard/account"
                  onClick={isOpen ? toggleBar : ""}
                >
                  <div className="flex gap-3 items-center ml-12">
                    <MdOutlineSettings className="text-xl" />{" "}
                    <span className="lg:text-lg font-semibold">Account</span>
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
              <FiLogOut className="text-xl" />
              <span className="lg:text-lg font-semibold">Log out</span>
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
