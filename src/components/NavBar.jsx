import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { Button } from "./Button";
import HomeSidebar from "./HomeSideBar";

const NavBar = ({ aboutUsRef, scrollToSection }) => {
  return (
    <header className="text-white py-5 font-bold text-sm h-28">
      <nav className=" hidden lg:flex justify-between h-full items-center">
        <div className="flex gap-3 items-center">
          <img src={logo} alt="logo" className="w-[60px]" />
        </div>
        <ul className="flex justify-end items-center gap-10">
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink onClick={() => scrollToSection(aboutUsRef)}>
              About Us
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink to="/login">
            <Button>Login</Button>
          </NavLink>
        </div>
      </nav>
      <HomeSidebar aboutUsRef={aboutUsRef} scrollToSection={scrollToSection} />
    </header>
  );
};

export default NavBar;
