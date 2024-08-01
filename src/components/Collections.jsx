import { useEffect, useState } from "react";
import { useText } from "../store/DashBoardContext";
import Collection from "./Collection";
import Modal from "../components/Modal";
import CreateCollection from "./CreateCollection";

const Collections = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { collectionFn } = useText();
  useEffect(() => collectionFn(), []);

  const toggleModal = () => setIsOpen(!isOpen);

  let content = (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
    </ul>
  );

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <CreateCollection action="Create" cancelModal={toggleModal} />
      </Modal>
      <div className="bg-white px-10 py-8 p mt-10 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl ">All Collections</h1>
          <button
            onClick={toggleModal}
            className="text-white bg-authblue text-sm px-4 py-2 rounded-md font-semibold"
          >
            + Create Collection
          </button>
        </div>
        {content}
      </div>
    </>
  );
};

export default Collections;
