import { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import AddField from "./AddField";
import { useMutation } from "@tanstack/react-query";
import { editCollection } from "../http";
import { toast } from "react-toastify";
import { queryClient } from "../App";

const EditCollection = ({ collection, database, toggleEdit }) => {
  const [index, setIndex] = useState();
  const [addField, setAddField] = useState(false);
  const [details, setDetails] = useState({
    name: collection.name,
    fields: collection.fields,
    _id: collection._id,
    database,
  });
  const [editField, setEditField] = useState(false);
  const { isPending, mutate, isError, error } = useMutation({
    mutationFn: editCollection,
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", database], (oldCollections) => {
        if (oldCollections) {
          const updatedCollections = [...oldCollections];
          const colIndex = updatedCollections.findIndex(
            (col) => col._id === data?.data?._id
          );
          updatedCollections[colIndex] = {
            ...updatedCollections[colIndex],
            name: data?.data?.name,
            fields: data?.data?.fields,
          };
          oldCollections = updatedCollections;
        }
        return oldCollections;
      });
      toggleEdit();
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["collection"],
      }),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  const addFieldHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fieldDetails = Object.fromEntries(formData);
    const updatedDetails = [...details.fields, fieldDetails];
    setDetails((prevState) => ({
      ...prevState,
      fields: updatedDetails,
    }));
    setAddField(false);
  };

  const editFieldHandler = (event, index) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fieldDetails = Object.fromEntries(formData);
    const updatedDetails = [...details.fields];
    updatedDetails[index] = fieldDetails;
    setDetails((prevState) => ({
      ...prevState,
      fields: updatedDetails,
    }));
    setEditField(false);
  };

  const deleteField = (index) => {
    const newDetails = details.fields.filter((field, inx) => inx !== index);
    setDetails((prevState) => ({
      ...prevState,
      fields: newDetails,
    }));
  };

  const cancelEdit = () => {
    setEditField(false);
  };
  const cancelAdd = () => {
    setAddField(false);
  };
  const addCollection = () => {
    mutate(details);
  };

  let content = (
    <>
      <h1 className="font-bold text-2xl text-center">Edit</h1>
      <input
        type="text"
        className="w-full border border-stone-300 p-2 rounded-lg outline-none"
        defaultValue={collection.name}
        onChange={(event) =>
          setDetails((prevState) => ({
            ...prevState,
            name: event.target.value,
          }))
        }
      />
      <p className="font-bold my-4 text-center">Edit Fields</p>
      <ul>
        {details.fields.map((field, indexValue) => (
          <li
            className="my-2 shadow-lg  p-4 flex justify-between"
            key={indexValue}
          >
            <div>
              <p>Name: {field.name}</p>
              <p>Data type: {field.dataType}</p>
              <p>Unique: {`${field.unique}`}</p>
              <p>Required: {`${field.required}`}</p>
            </div>
            <div className="flex gap-3 items-end">
              <span
                className="bg-stone-100 rounded-lg "
                onClick={() => {
                  setIndex(indexValue);
                  setEditField(true);
                }}
              >
                <MdOutlineModeEdit className="m-2 text-xs text-stone-400" />
              </span>
              <span
                className="bg-stone-100 rounded-lg"
                onClick={() => deleteField(indexValue)}
              >
                <RiDeleteBinFill className="m-2 text-xs text-stone-400" />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={() => setAddField(true)}
          className="font-bold bg-stone-200 h-7 w-7 rounded-md "
        >
          +
        </button>
        <p> Add Field</p>
      </div>
      <div className="text-center mt-5 lg:mt-0">
        <button
          className="text-white bg-authblue text-sm px-10 py-2 rounded-md font-semibold"
          disabled={isPending}
          onClick={addCollection}
        >
          {isPending && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {!isPending && "Edit"}
        </button>
      </div>
    </>
  );
  if (editField) {
    content = (
      <AddField
        addFieldHandler={editFieldHandler}
        cancelFieldHandler={cancelEdit}
        action="Edit"
        name={details.fields[index]?.name}
        index={index}
      />
    );
  }
  if (addField) {
    content = (
      <AddField
        addFieldHandler={addFieldHandler}
        cancelFieldHandler={cancelAdd}
        action="Add"
      />
    );
  }
  return <div className="min-w-[300px] md:w-[500px]">{content}</div>;
};

export default EditCollection;
