import { useMutation, useQuery } from "@tanstack/react-query";
import { addDocument, fetchDocument } from "../http";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { queryClient } from "../App";
import { useParams } from "react-router-dom";
import Modal from "./Modal";

const fileDataTypes = ["image", "video", "document"];

const AddDocument = ({ collection, cancelModal }) => {
  const { database } = useParams();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [linkedId, setLinkedId] = useState(collection?._id);
  const {
    isError,
    data: document,
    isPending: docPending,
  } = useQuery({
    queryFn: () => fetchDocument(linkedId, database, page),
    queryKey: ["collections", database, "documents", linkedId, page],
  });
  const { mutate, isPending } = useMutation({
    mutationFn: addDocument,
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
      // cancelModal();
    },
  });
  const handleForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("collectionId", collection._id);
    formData.append("database", database);
    mutate(formData);
  };
  const fetchDocuments = (id, name) => {
    setShow(name);
    setLinkedId(id);
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
              document?.data?.map((documentDetails) => (
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
            {!docPending && document?.totalPages > 1 && (
              <Pagination
                data={document}
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
              {field.dataType === "link to another document" && (
                <div className="relative">
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
                    className="absolute inset-0 opacity-0 pointer-events-none"
                    value={selectedDocuments[field?.name]}
                    name={field?.name}
                  />
                </div>
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
    </>
  );
};

export default AddDocument;
