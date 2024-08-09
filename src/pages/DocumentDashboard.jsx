import { useEffect, useState } from "react";
import { useText } from "../store/DashBoardContext";
import { Link, Outlet, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchCollectionDetails } from "../http";
import { toast } from "react-toastify";
import AddDocument from "../components/AddDocument";

const DocumentDashBoard = () => {
  const { database, collection } = useParams();
  const { documentFn } = useText();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isError, error } = useQuery({
    queryKey: ["collection", database, collection],
    queryFn: () => fetchCollectionDetails(collection, database),
  });

  useEffect(() => documentFn, []);
  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
      setIsOpen(false);
    }
  }, [isError, error]);

  const toggleModal = () => setIsOpen(false);

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <AddDocument
          collection={data}
          database={database}
          cancelModal={toggleModal}
        />
      </Modal>
      <div className="bg-white px-10 py-8 p mt-2 min-h-screen">
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
            <button
              className="text-white bg-authblue text-sm px-4 py-2 rounded-md font-semibold"
              onClick={() => setIsOpen(true)}
            >
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
