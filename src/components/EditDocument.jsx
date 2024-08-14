import { useMutation } from "@tanstack/react-query";
import { editDocument } from "../http";
import { toast } from "react-toastify";
import { queryClient } from "../App";
import { useParams } from "react-router-dom";

const fileDataTypes = ["image", "video", "document"];

const EditDocument = ({ collection, cancelModal, document }) => {
  const { database } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: editDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections", database, "documents", collection._id],
      }),
        cancelModal();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
      queryClient.invalidateQueries({
        queryKey: ["collections", database, "documents", collection._id],
      });
    },
  });
  const handleForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("_id", document._id);
    for (const [key, value] of formData.entries()) {
      if (value && value?.size === 0) {
        formData.delete(key);
        const oldValue = document.files.find((fl) => fl.name === key);
        formData.append(key, oldValue);
      }
    }
    mutate(formData);
  };

  const defaultValue = (name) => {
    const text = document?.text?.find((tx) => tx.name === name);
    return text.value;
  };
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
                defaultValue={defaultValue(field.name)}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              />
            )}
            {field.dataType === "numeric value" && (
              <input
                type="number"
                name={field.name}
                defaultValue={defaultValue(field.name)}
                className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
              />
            )}
            {field.dataType === "true/false" && (
              <select
                type="text"
                name={field.name}
                defaultValue={`${defaultValue(field.name)}`}
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
          {!isPending && "Edit"}
        </button>
      </div>
    </form>
  );
};

export default EditDocument;
