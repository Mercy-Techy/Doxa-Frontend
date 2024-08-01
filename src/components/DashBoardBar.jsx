import woman from "../assets/woman1.png";
import { CiSearch } from "react-icons/ci";
import { useText } from "../store/DashBoardContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "../http";
import { useEffect } from "react";
import { toast } from "react-toastify";

const DashBoardBar = () => {
  const { text } = useText();

  const { data, isError, error } = useQuery({
    queryFn: fetchUserDetails,
    queryKey: ["user"],
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  return (
    <div className="w-full md:flex justify-between items-center ">
      <div>
        <p className="font-semibold capitalize text-3xl">{text.heading}</p>
        <p className="text-textgray text-sm mb-6 md:mb-0">
          Manage {text.subHeading}
        </p>
      </div>
      <div className="relative w-2/6">
        <input
          type="text"
          className="outline-none rounded-lg px-4 py-2 w-full"
        />
        <CiSearch className="absolute bottom-2 left-2 font-extrabold text-xl" />
      </div>
      <div className="hidden md:flex gap-4 items-center capitalize">
        <p>{data?.firstname || "User"}</p>
        <img
          src={data?.avatar?.url || woman}
          alt="image"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default DashBoardBar;
