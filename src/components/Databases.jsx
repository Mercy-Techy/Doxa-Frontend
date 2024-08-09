import { useQuery } from "@tanstack/react-query";
import Database from "./Database";
import { addDatabase, fetchDatabase } from "../http";
import { useState } from "react";
import Modal from "../components/Modal";
import CreateDatabase from "./CreateDatabase";

const Databases = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isError, data, isSuccess } = useQuery({
    queryFn: fetchDatabase,
    queryKey: ["database"],
  });
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
        {data.map((database) => (
          <Database key={database._id} {...database} />
        ))}
      </ul>
    );
  }
  if ((isSuccess && !data) || (isSuccess && data?.length == 0) || isError) {
    content = <p>You have no database</p>;
  }

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <CreateDatabase
          cancelModal={toggleModal}
          mutationFn={addDatabase}
          action="Create"
        />
      </Modal>
      <div className="bg-white px-10 py-8 p mt-2 min-h-screen w-full">
        <div className="md:flex justify-between items-center">
          <h1 className="hidden sm:block font-semibold text-xl ">
            All Databases
          </h1>
          <button
            onClick={toggleModal}
            className="text-white bg-authblue text-sm px-4 py-2 rounded-md font-semibold"
          >
            + Create Database
          </button>
        </div>
        {content}
      </div>
    </>
  );
};

export default Databases;
