import { useMutation, useQuery } from "@tanstack/react-query";
import { editDocument, fetchDocument } from "../http";
import { toast } from "react-toastify";
import { queryClient } from "../App";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

const fileDataTypes = ["image", "video", "document"];

const EditDocument = ({ collection, cancelModal, document }) => {
  const [page, setPage] = useState(1);
  const [show, setShow] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [linkedId, setLinkedId] = useState(collection?._id);
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
  const {
    isError,
    data: documents,
    isPending: docPending,
  } = useQuery({
    queryFn: () => fetchDocument(linkedId, database, page),
    queryKey: ["collections", database, "documents", linkedId, page],
  });
  const fetchDocuments = (id, name) => {
    setShow(name);
    setLinkedId(id);
  };
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

  const onSelect = (value) => {
    setSelectedDocuments((prev) => ({ ...prev, [show]: value }));
    setShow("");
  };

  return (
    <>
      <Modal isOpen={show} closeModal={() => setShow("")}>
        <div className="md:w-[350px] w-full">
          <h1 className="my-1">Select</h1>
          <ul>
            {!docPending &&
              documents?.data?.map((documentDetails) => (
                <li
                  className="shadow-lg rounded-xl mt-4 cursor-pointer"
                  onClick={() => onSelect(documentDetails?._id)}
                  key={documentDetails?._id}
                >
                  <div className="bg-green-100 h-2 rounded-t-xl"></div>
                  <div className="p-6 pt-4">
                    {documentDetails?.text?.map((tx) => (
                      <p className="capitalize" key={tx._id}>
                        {tx.name}:{" "}
                        <span className="font-bold">{`${tx.value}`}</span>
                      </p>
                    ))}
                    {documentDetails.ifFile &&
                      documentDetails?.files?.map((fl) => {
                        return (
                          <div
                            className="capitalize flex gap-1 items-center my-2"
                            key={fl._id}
                          >
                            <span>{fl.name}:</span>
                            <button className="text-textlime border border-textlime text-sm px-4 py-1 rounded-md font-semibold ">
                              File
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </li>
              ))}
            {!docPending && documents?.totalPages > 1 && (
              <Pagination
                data={documents}
                page={page}
                setPage={setPage}
                margin="my-0"
                margin2="my-0"
              />
            )}
            {docPending && (
              <div className="w-full text-center">
                <span className="loading loading-spinner loading-lg "></span>
              </div>
            )}
          </ul>
        </div>
      </Modal>
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
              {field.dataType === "link to another document" && (
                <div className="relative w-full">
                  <button
                    type="button"
                    className="z-10 text-white w-full bg-authblue text-sm font-semibold mt-2 flex-1 p-2 rounded-lg"
                    onClick={() =>
                      fetchDocuments(field?.data?.collectionId, field?.name)
                    }
                  >
                    Select Document
                  </button>
                  <input
                    type="text"
                    className="absolute inset-0 opacity-0 pointer-events-none w-full"
                    value={selectedDocuments[field?.name]}
                    name={field?.name}
                  />
                </div>
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
    </>
  );
};

export default EditDocument;
