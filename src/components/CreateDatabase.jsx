import { useMutation } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../App";

const CreateDatabase = ({
  cancelModal,
  action,
  mutationFn,
  _id,
  defaultValue,
}) => {
  const nameRef = useRef("");
  const [invalid, setInvalid] = useState(false);
  const { mutate, isError, error, isPending } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["database"], (oldDbs) => {
        if (oldDbs) {
          if (action === "Create") {
            oldDbs.push(data.data);
          } else {
            const updatedDbs = [...oldDbs];
            const dbIndex = updatedDbs.findIndex(
              (db) => db._id === data?.data?._id
            );
            updatedDbs[dbIndex] = {
              ...updatedDbs[dbIndex],
              name: data?.data?.name,
            };
            oldDbs = updatedDbs;
          }
        }
        return oldDbs;
      });
      return cancelModal();
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["database"] }),
  });

  const createHandler = () => {
    const name = nameRef.current?.value?.trim();
    if (!name || name?.length < 3) {
      return setInvalid(!invalid);
    }
    return mutate({ name, _id });
  };

  useEffect(() => {
    if (invalid) {
      toast.error(
        "Database name is required and must be nothning less than two characters"
      );
      setInvalid(false);
    }
  }, [invalid]);

  useEffect(() => {
    if (isError) {
      cancelModal();
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  return (
    <div className="w-[25rem]  font-koho p-2">
      <h1 className="font-medium text-authblue text-xl text-center">
        {action} Database
      </h1>

      <div className="mt-4">
        <label className="text-sm block text-black">Database Name</label>
        <input
          type="text"
          ref={nameRef}
          defaultValue={defaultValue}
          className="outline-none border border-stone-300 mt-2 w-full p-2 rounded-lg"
        />
      </div>
      <div className="mt-14 flex gap-3 items-center justify-center">
        <button
          className="text-authblue border border-authblue text-sm px-10 py-2 rounded-md font-semibold"
          onClick={cancelModal}
        >
          Cancel
        </button>
        <button
          className="text-white bg-authblue text-sm px-10 py-2 rounded-md font-semibold"
          onClick={createHandler}
        >
          {isPending && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {!isPending && action}
        </button>
      </div>
    </div>
  );
};

export default CreateDatabase;
