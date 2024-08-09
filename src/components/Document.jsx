import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { deleteDocument } from "../http";
import { toast } from "react-toastify";
import { queryClient } from "../App";
import DeleteContent from "./DeleteContent";
import Modal from "./Modal";

const Document = ({ documentDetails }) => {
  const [download1, setDownload1] = useState(false);
  const [download2, setDownload2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleModal = () => setIsOpen(false);
  const toggleEdit = () => setEdit(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.setQueryData(
        ["collection", "documents", database, collection],
        (oldDocuments) => {
          if (oldDocuments) {
            const updatedDocuments = oldDocuments.filter(
              (doc) => doc._id !== documentDetails._id
            );
            oldDocuments = updatedDocuments;
          }
          return oldDocuments;
        }
      );
      return toggleModal();
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["collection", "documents"],
      }),
    onError: (error) => {
      return toast.error(error?.response?.data?.message || error.message);
    },
  });

  const viewImage = (url) => {
    window.open(url, "_blank");
  };
  const handleDownload = async (fileUrl, setDownload) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setDownload(false);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const deleteHandler = () => {
    mutate(documentDetails._id);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <DeleteContent
          toggleModal={toggleModal}
          text="document"
          deleteFunction={deleteHandler}
          isPending={isPending}
        />
      </Modal>
      <li className="shadow-lg rounded-xl mt-10 min-w-[250px] min-h-48">
        <div className="bg-green-100 h-2 rounded-t-xl"></div>
        <div className="p-6 pt-4">
          {documentDetails?.text?.map((tx) => (
            <p className="capitalize" key={tx._id}>
              {tx.name}: <span className="font-bold">{`${tx.value}`}</span>
            </p>
          ))}
          {documentDetails.ifFile &&
            documentDetails?.files?.map((fl) => {
              if (fl.fileType === "image" || fl.fileType === "video") {
                return (
                  <div
                    className="capitalize flex gap-1 items-center my-2"
                    key={fl._id}
                  >
                    <span>{fl.name}:</span>
                    <div className="flex items-center gap-3">
                      <button
                        className="text-authblue border border-authblue text-sm px-4 py-1 rounded-md font-semibold "
                        onClick={() => viewImage(fl.url)}
                      >
                        View
                      </button>
                      <button
                        disabled={download1}
                        className="text-textlime border border-textlime text-sm px-4 py-1 rounded-md font-semibold "
                        onClick={() => {
                          setDownload1(true);
                          handleDownload(fl.url, setDownload1);
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="capitalize flex gap-1 items-center my-2"
                    key={fl._id}
                  >
                    <span>{fl.name}:</span>
                    <button
                      disabled={download2}
                      className="text-textlime border border-textlime text-sm px-4 py-1 rounded-md font-semibold "
                      onClick={() => {
                        setDownload2(true);
                        handleDownload(fl.url, setDownload2);
                      }}
                    >
                      Download
                    </button>
                  </div>
                );
              }
            })}
          <div className="flex items-center gap-3 justify-end mt-4">
            <span className="bg-stone-100 rounded-lg ">
              <MdOutlineModeEditOutline
                className="m-3 text-sm text-stone-400"
                // onClick={() => setEditIsOpen(true)}
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
      </li>
    </>
  );
};

export default Document;
