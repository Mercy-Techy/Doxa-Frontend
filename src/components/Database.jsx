import { Link } from "react-router-dom";
import { GoDatabase } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteContent from "./DeleteContent";
import { useState } from "react";
import Modal from "../components/Modal";
import { useMutation } from "@tanstack/react-query";
import { deleteDatabase, editDatabase } from "../http";
import { queryClient } from "../App";
import { toast } from "react-toastify";
import CreateDatabase from "./CreateDatabase";

const Database = ({ name, collections, documents, _id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(false);
  const toggleEditModal = () => setEditIsOpen(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDatabase,
    onSuccess: () => {
      queryClient.setQueryData(["database"], (oldDbs) => {
        if (oldDbs) {
          const updatedDbs = oldDbs.filter((db) => db._id !== _id);
          console.log(updatedDbs);
          oldDbs = updatedDbs;
        }
        return oldDbs;
      });
      return toggleModal();
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["database"] }),
    onError: (error) => {
      return toast.error(error?.response?.data?.message || error.message);
    },
  });

  const deleteHandler = () => {
    mutate(_id);
  };

  return (
    <Link to={`${_id}/collections`}>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <DeleteContent
          toggleModal={toggleModal}
          text="database"
          deleteFunction={deleteHandler}
          isPending={isPending}
        />
      </Modal>
      <Modal isOpen={editIsOpen} closeModal={toggleEditModal}>
        <CreateDatabase
          cancelModal={toggleEditModal}
          mutationFn={editDatabase}
          action="Edit"
          _id={_id}
          defaultValue={name}
        />
      </Modal>
      <li className="shadow-lg rounded-xl mt-10 max-w-[280px] h-48">
        <div className="bg-green-100 h-2 rounded-t-xl"></div>
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <GoDatabase className="text-authblue" />
            <h2 className="font-medium capitalize">{name}</h2>
          </div>
          <div className="my-4">
            <p className="font-medium">Collections: {collections}</p>
            <p className="font-medium">Documents: {documents}</p>
          </div>
          <div className="flex justify-between items-center">
            <button className="rounded-md border border-textgray text-textgray text-xs px-4 py-1">
              Invite users
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-stone-100 rounded-lg ">
                <MdOutlineModeEditOutline
                  className="m-3 text-sm text-stone-400"
                  onClick={() => setEditIsOpen(true)}
                />
              </span>
              <span
                className="bg-stone-100 rounded-lg"
                onClick={() => setIsOpen(true)}
              >
                <RiDeleteBinFill className="m-3 text-sm text-stone-400" />
              </span>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Database;
