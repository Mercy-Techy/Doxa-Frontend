import { Link } from "react-router-dom";
import { GoDatabase } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteContent from "./DeleteContent";
import { useState } from "react";
import { deleteCollection } from "../http";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import Modal from "./Modal";
import { toast } from "react-toastify";
import EditCollection from "./EditCollection";

const Collection = ({ collection, database }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleModal = () => setIsOpen(false);
  const toggleEdit = () => setEdit(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.setQueryData(["collections", database], (oldCollections) => {
        if (oldCollections) {
          const updatedCollections = oldCollections.filter(
            (col) => col._id !== collection._id
          );
          oldCollections = updatedCollections;
        }
        return oldCollections;
      });
      return toggleModal();
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["collections"] }),
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
      return toggleModal();
    },
  });

  const deleteHandler = () => {
    mutate(collection._id);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <DeleteContent
          toggleModal={toggleModal}
          text="collection"
          deleteFunction={deleteHandler}
          isPending={isPending}
        />
      </Modal>
      <Modal isOpen={edit} closeModal={toggleEdit}>
        <EditCollection
          collection={collection}
          database={database}
          toggleEdit={toggleEdit}
        />
      </Modal>
      <li className="shadow-lg rounded-xl mt-10 mix-w-[250px] h-48">
        <div className="bg-green-100 h-2 rounded-t-xl"></div>
        <div className="p-6">
          <div className="flex gap-6 items-center">
            <GoDatabase className="text-authblue" />
            <h2 className="font-medium capitalize">{collection.name}</h2>
          </div>
          <Link to={collection._id}>
            <div className="my-4 font-medium">
              Documents: {collection.documents || 0}
            </div>
          </Link>
          <div className="flex items-center gap-3 justify-end">
            <span
              className="bg-stone-100 rounded-lg"
              onClick={() => setEdit(true)}
            >
              <MdOutlineModeEditOutline className="m-3 text-sm text-stone-400" />
            </span>
            <span className="bg-stone-100 rounded-lg">
              <RiDeleteBinFill
                className="m-3 text-sm text-stone-400"
                onClick={() => setIsOpen(true)}
              />
            </span>
          </div>
        </div>
      </li>
    </>
  );
};

export default Collection;
