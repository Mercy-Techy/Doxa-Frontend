import { useEffect, useState } from "react";
import CreateCollection from "../components/CreateCollection";
import Modal from "../components/Modal";
import { addCollection } from "../http";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useText } from "../store/DashBoardContext";
import { CgArrowLongLeft } from "react-icons/cg";

const CollectionDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsOpen(!isOpen);

  const { collectionFn } = useText();
  useEffect(() => collectionFn(), []);

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <CreateCollection
          action="Create"
          cancelModal={toggleModal}
          mutationFn={addCollection}
        />
      </Modal>
      <div className="mt-2">
        <CgArrowLongLeft className="text-4xl" onClick={() => navigate(-1)} />
      </div>
      <div className="bg-white px-10 py-8 p mt-2 min-h-screen">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <Link>
              <h1 className="font-semibold text-xl ">All Collections</h1>
            </Link>
            <Link to="users">
              <h1 className="font-semibold text-xl ">Database Users</h1>
            </Link>
          </div>
          <button
            onClick={toggleModal}
            className="text-white bg-authblue text-sm px-4 py-2 rounded-md font-semibold"
          >
            + Create Collection
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default CollectionDashboard;
