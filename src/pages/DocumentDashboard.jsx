import { useEffect } from "react";
import { useText } from "../store/DashBoardContext";
import { Link, Outlet, useParams } from "react-router-dom";

const DocumentDashBoard = () => {
  const { database, collection } = useParams();
  const { documentFn } = useText();

  useEffect(() => documentFn, []);

  return (
    <>
      <div className="bg-white px-10 py-8 p mt-10 min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Link to={`/dashboard/${database}/${collection}/documents`}>
              <h1 className="font-semibold text-xl hover:text-authblue ">
                All Documents
              </h1>
            </Link>
            <Link to="schema">
              <h1 className="font-semibold text-xl hover:text-authblue ">
                Collection Schema
              </h1>
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            <button className="text-authblue border border-authblue text-sm px-12 py-2 rounded-md font-semibold">
              Export data
            </button>
            <button className="text-white bg-authblue text-sm px-4 py-2 rounded-md font-semibold">
              + Create Document
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DocumentDashBoard;
