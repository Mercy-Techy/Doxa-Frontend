import { Outlet } from "react-router-dom";
import DashBoardBar from "../components/DashBoardBar";
import SideBar from "../components/SideBar";

const DashBoard = () => {
  return (
    <div className="lg:flex font-koho">
      <SideBar />
      <div className="bg-bggray p-6 pb-0 flex-1 h-full">
        <DashBoardBar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
