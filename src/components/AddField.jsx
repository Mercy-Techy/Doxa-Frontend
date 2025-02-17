import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchCollection } from "../http";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";

const AddField = ({
  addFieldHandler,
  cancelFieldHandler,
  action,
  name,
  index,
}) => {
  const { database } = useParams();
  const [show, setShow] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const [page, setPage] = useState(1);
  const { isError, data, isPending } = useQuery({
    queryFn: () => fetchCollection(database, page),
    queryKey: ["collections", database, page],
  });

  const handleChange = (event) => {
    if (event?.target?.value === "link to another document") setShow(true);
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-6 pt-6 pb-2 rounded-lg shadow-lg md:w-3/4 w-full max-h-[500px] overflow-auto">
            <h1 className="my-1">Select</h1>
            {!isPending &&
              data?.data?.map((collection, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCollectionId(collection?._id);
                    setShow(false);
                  }}
                  className="text p-2 rounded shadow mb-4 bg-blue-50 capitalize cursor-pointer"
                >
                  {collection?.name + " "} <span>Collection</span>
                </div>
              ))}
            {!isPending && data?.totalPages > 1 && (
              <Pagination
                data={data}
                page={page}
                setPage={setPage}
                margin="my-0"
                margin2="my-0"
              />
            )}
            {isPending && (
              <span className="loading loading-spinner loading-lg"></span>
            )}
          </div>
        </div>
      )}
      <form onSubmit={(event) => addFieldHandler(event, index, collectionId)}>
        <div className="flex gap-4 items-center my-2">
          <label className="font-semibold">Field name:</label>
          <input
            type="text"
            name="name"
            defaultValue={name}
            className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
          />
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="font-semibold">Data Type:</label>
          <select
            type="text"
            name="dataType"
            onChange={handleChange}
            className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
          >
            <option value="text">Text</option>
            <option value="numeric value">Numeric value</option>
            <option value="true/false">True/False</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
            <option value="link to another document">
              Link to another document
            </option>
          </select>
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="font-semibold">Required:</label>
          <select
            type="text"
            name="required"
            className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="font-semibold">Unique:</label>
          <select
            type="text"
            name="unique"
            className="outline-none border border-authblue text-black font-medium text-[14px] mt-2 flex-1 p-2 rounded-lg"
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
        <div className="text-center flex gap-5 justify-center">
          <button
            className="text-authblue border border-authblue text-sm px-12 py-2 rounded-md font-semibold mt-6"
            type="button"
            onClick={cancelFieldHandler}
          >
            Cancel
          </button>

          <button
            className="text-white bg-authblue text-sm px-10 py-2 rounded-md font-semibold mt-6"
            type="submit"
          >
            {action}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddField;
