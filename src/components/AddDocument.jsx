import { useMutation } from "@tanstack/react-query";
import { addDocument } from "../http";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { queryClient } from "../App";
import { useParams } from "react-router-dom";

const fileDataTypes = ["image", "video", "document"];

const AddDocument = ({ cancelModal }) => {
  const { collection, database } = useParams();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addDocument,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["collection", "documents", database, collection],
        (oldDocuments) => {
          console.log("working", oldDocuments);
          if (oldDocuments) {
            oldDocuments.push(data.data);
          }
          return oldDocuments;
        }
      );
      cancelModal();
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["collection", database, collection, "documents"],
      }),
  });
  const handleForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("collectionId", collection._id);
    formData.append("database", database);
    mutate(formData);
  };

  useEffect(() => {
    if (isError) {
      cancelModal();
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  return (
    <form className="md:w-[400px]" onSubmit={handleForm}>
      {collection.fields.map((field) => {
        return (
          <div className="flex gap-4 items-center my-2" key={field._id}>
            <label className="font-semibold capitalize">{field.name}</label>
            {field.dataType === "text" && (
              <input
                type="text"
                name={field.name}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              />
            )}
            {field.dataType === "numeric value" && (
              <input
                type="number"
                name={field.name}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              />
            )}
            {field.dataType === "true/false" && (
              <select
                type="text"
                name={field.name}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}
            {fileDataTypes.includes(field.dataType) && (
              <input
                type="file"
                name={field.name}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              />
            )}
          </div>
        );
      })}
      <div className="flex gap-5 justify-center items-center mt-6">
        <button
          className="text-authblue border border-authblue text-sm px-12 py-2 rounded-md font-semibold "
          type="button"
          onClick={cancelModal}
        >
          Cancel
        </button>

        <button
          className="text-white bg-authblue text-sm px-14 py-2 rounded-md font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {!isPending && "Add"}
        </button>
      </div>
    </form>
  );
};

export default AddDocument;
