import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import DashBoardBar from "../components/DashBoardBar";
import SideBar from "../components/SideBar";
import { getTokenDuration } from "../util/auth";
import { useEffect } from "react";

const DashBoard = () => {
  const token = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || token === "EXPIRED") {
      return navigate("/logout");
    }
    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      return navigate("/logout");
    }, tokenDuration);
  }, [token]);

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
