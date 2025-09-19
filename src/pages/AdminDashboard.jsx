import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import { getTokenDuration } from "../util/auth";
import { useEffect } from "react";
import woman from "../assets/woman1.png";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../http";

const AdminDashboard = () => {
  const token = useLoaderData();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryFn: fetchUserDetails,
    queryKey: ["user"],
  });

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
      <AdminSideBar />
      <div className="p-6 flex-1 h-full">
        <div className="w-full">
          <div className="md:flex justify-between items-center">
            <div>
              <p className="font-semibold capitalize text-3xl">
                Welcome Back {user?.firstname}
              </p>
              <p className="text-textgray text-sm mb-6 md:mb-0">
                Glad to see you again
              </p>
            </div>
            <div className="hidden md:flex gap-4 items-center capitalize">
              <p>{user?.firstname}</p>
              <Link to="/dashboard/account">
                <img
                  src={user?.avatar?.url || woman}
                  alt="image"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
