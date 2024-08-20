import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteDatabaseUser, EditDatabaseUser, fetchDatabase } from "../http";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { queryClient } from "../App";
import Modal from "../components/Modal";
import DeleteContent from "../components/DeleteContent";

const Users = () => {
  const { database } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const { isError, data, error } = useQuery({
    queryFn: fetchDatabase,
    queryKey: ["database"],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: EditDatabaseUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["database"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });
  const toggleModal = () => setOpen(false);

  const { mutate: delMutate, isPending: delIsPending } = useMutation({
    mutationFn: deleteDatabaseUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["database"] });
      toggleModal();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || err.message);
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  const editPrivilege = (event, userId) => {
    event.preventDefault();
    const editForm = new FormData(event.target);
    const editValue = Object.fromEntries(editForm);
    mutate({ ...editValue, userId, _id: database });
  };
  const deleteUser = () => {
    delMutate({ userId: open, _id: database });
  };

  let content = <p>Loading database users...</p>;

  if (data) {
    const DB = data.find((db) => db._id === database);
    if (DB) {
      content = (
        <ul className="font-bold capitalize">
          {DB.users.length > 0 &&
            DB.users.map((user) => (
              <li className="my-4 shadow rounded-lg p-4 " key={user._id}>
                <div className="capitalize">
                  <div>
                    Name: {user.user?.firstname} {user.user?.lastname}
                  </div>
                  <div className="flex gap-1 items-center">
                    <div>Privilege:</div>
                    {!edit && <div>{user.privilege}</div>}
                    {edit && (
                      <form
                        className="flex gap-2 items-center"
                        onSubmit={(event) =>
                          editPrivilege(event, user.user?._id)
                        }
                      >
                        <select
                          className="border border-stone-200 font-medium px-6 py-1 rounded-lg outline-none text-sm"
                          name="privilege"
                        >
                          <option value={user.privilege}>-- Select</option>
                          <option value="view">View </option>
                          <option value="edit-structure">Edit Content</option>
                          <option value="edit-structure">Edit Structure</option>
                        </select>
                        <button
                          className="bg-authblue text-white px-4 py-1 text-sm rounded-lg"
                          type="submit"
                        >
                          {isPending && (
                            <span className="loading loading-spinner loading-sm mx-7"></span>
                          )}
                          {!isPending && "Add"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <MdOutlineModeEditOutline
                    className="text-green-500 font-bold"
                    onClick={() => setEdit(true)}
                  />
                  <RiDeleteBinLine
                    className="text-red-600 font-bold"
                    onClick={() => setOpen(user.user?._id)}
                  />
                </div>
              </li>
            ))}
          {DB.users.length === 0 && (
            <li className="flex justify-center mt-16 font-normal">
              Databases does not have added users
            </li>
          )}
        </ul>
      );
    } else {
      content = <p>Cannot find Database Users</p>;
    }
  }
  return (
    <>
      <Modal isOpen={open} closeModal={toggleModal}>
        <DeleteContent
          toggleModal={toggleModal}
          text="user"
          deleteFunction={deleteUser}
          isPending={delIsPending}
        />
      </Modal>
      {content}
    </>
  );
};

export default Users;
