import { useEffect, useState } from "react";
import { useText } from "../store/DashBoardContext";
import Collection from "./Collection";
import Modal from "./Modal";
import CreateCollection from "./CreateCollection";
import { addCollection, fetchCollection } from "../http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Collections = () => {
  const { database } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { isError, data, isSuccess } = useQuery({
    queryFn: () => fetchCollection(database),
    queryKey: ["collections", database],
  });

  const { collectionFn } = useText();
  useEffect(() => collectionFn(), []);

  const toggleModal = () => setIsOpen(!isOpen);

  let content = (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
    </ul>
  );
  if (data) {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16 gap-5">
        {data.map((collection) => (
          <Collection
            key={collection._id}
            collection={collection}
            database={database}
          />
        ))}
      </ul>
    );
  }
  if ((isSuccess && !data) || (isSuccess && data?.length == 0) || isError) {
    content = <p>You have no collections in your database</p>;
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <CreateCollection
          action="Create"
          cancelModal={toggleModal}
          mutationFn={addCollection}
        />
      </Modal>
      <div className="bg-white px-10 py-8 p mt-2 min-h-screen">
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
