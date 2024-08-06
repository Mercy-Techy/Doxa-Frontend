import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddField from "./AddField";
import { queryClient } from "../App";

const CreateCollection = ({
  cancelModal,
  action,
  mutationFn,
  _id,
  defaultValue,
}) => {
  const { database } = useParams();
  const { isPending, error, isError, mutate } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.setQueryData(["collection", database], (oldCollections) => {
        if (oldCollections) {
          if (action === "Create") {
            oldCollections.push(data.data);
          }
        }
      });
      cancelModal();
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["collection", database],
      }),
  });
  const nameRef = useRef("");
  const [invalid, setInvalid] = useState(false);
  const [edit, setEdit] = useState({ name: "", id: "", edit: false });
  const [formDetails, setformDetails] = useState({
    name: "",
    show: false,
    fields: [],
    showFields: false,
  });

  const addNameHandler = () => {
    const name = nameRef.current?.value?.trim();
    if (!formDetails.name) {
      if (!name || name?.length < 3) {
        return setInvalid(!invalid);
      }
    }
    const objectDetails = { name, show: true, showFields: false };
    if (formDetails.name) delete objectDetails.name;
    return setformDetails((prevState) => ({
      ...prevState,
      ...objectDetails,
    }));
  };
  const addFieldHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fieldDetails = Object.fromEntries(formData);
    const updatedDetails = [...formDetails.fields, fieldDetails];
    setformDetails((prevState) => ({
      ...prevState,
      show: false,
      fields: updatedDetails,
      showFields: true,
    }));
  };

  const editFieldHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fieldDetails = Object.fromEntries(formData);
    const updatedDetails = [...formDetails.fields];
    updatedDetails[edit.id] = fieldDetails;
    setformDetails((prevState) => ({
      ...prevState,
      show: false,
      fields: updatedDetails,
      showFields: true,
    }));
    setEdit({ name: "", id: "", edit: false });
  };

  const cancelEdit = () => {
    setEdit({ name: "", id: "", edit: false });
    setformDetails((prevState) => ({
      ...prevState,
      showFields: true,
    }));
  };

  const cancelFieldHandler = () => {
    if (formDetails.fields?.length == 0) {
      setformDetails((prevState) => ({
        ...prevState,
        show: false,
        showFields: false,
      }));
    } else {
      setformDetails((prevState) => ({
        ...prevState,
        show: false,
        showFields: true,
      }));
    }
  };
  const deleteField = (index) => {
    const newDetails = formDetails.fields.filter((field, inx) => inx !== index);
    if (newDetails.length == 0) {
      setformDetails((prevState) => ({
        ...prevState,
        fields: [],
        show: false,
        showFields: false,
      }));
    } else {
      setformDetails((prevState) => ({
        ...prevState,
        fields: newDetails,
        show: false,
        showFields: true,
      }));
    }
  };
  const addCollection = () => {
    mutate({ ...formDetails, database });
  };

  useEffect(() => {
    if (invalid) {
      toast.error(
        "Collection name is required and must be nothning less than two characters"
      );
      setInvalid(false);
    }
  }, [invalid]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  let content = (
    <>
      <h1 className="font-medium text-authblue text-xl text-center">
        {action} Collection
      </h1>

      <div className="mt-4">
        <label className="text-sm block text-black">Collection Name</label>
        <input
          type="text"
          ref={nameRef}
          defaultValue={formDetails.name}
          className="outline-none border border-stone-300 mt-2 w-full p-2 rounded-lg"
        />
      </div>
      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={addNameHandler}
          className="font-bold bg-stone-200 h-7 w-7 rounded-md "
        >
          +
        </button>
        <p> Add Field</p>
      </div>
      <div className="mt-14 flex gap-3 items-center justify-center">
        <button
          className="text-authblue border border-authblue text-sm px-10 py-2 rounded-md font-semibold"
          onClick={cancelModal}
        >
          Cancel
        </button>
      </div>
    </>
  );
  if (formDetails.showFields) {
    content = (
      <>
        <h1 className="font-bold text-2xl text-center">Add More</h1>
        <p className="font-bold mt-6 capitalize">
          Collection Name: {formDetails.name}
        </p>
        <p className="font-bold my-4 text-center">Fields</p>
        <ul>
          {formDetails.fields.map((field, index) => (
            <li
              className="my-2 shadow-lg  p-4 flex justify-between"
              key={index}
            >
              <div>
                <p>Name: {field.name}</p>
                <p>Data type: {field.dataType}</p>
                <p>Unique: {field.unique}</p>
                <p>Required: {field.required}</p>
              </div>
              <div className="flex gap-3 items-end">
                <span
                  className="bg-stone-100 rounded-lg "
                  onClick={() =>
                    setEdit({ name: field.name, id: index, edit: true })
                  }
                >
                  <MdOutlineModeEdit className="m-2 text-xs text-stone-400" />
                </span>
                <span
                  className="bg-stone-100 rounded-lg"
                  onClick={() => deleteField(index)}
                >
                  <RiDeleteBinFill className="m-2 text-xs text-stone-400" />
                </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-3 justify-end">
          <button
            onClick={addNameHandler}
            className="font-bold bg-stone-200 h-7 w-7 rounded-md "
          >
            +
          </button>
          <p> Add Field</p>
        </div>
        <div className="text-center">
          <button
            className="text-white bg-authblue text-sm px-10 py-2 rounded-md font-semibold"
            disabled={isPending}
            onClick={addCollection}
          >
            {isPending && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            {!isPending && action}
          </button>
        </div>
      </>
    );
  }
  if (formDetails.show) {
    content = (
      <AddField
        addFieldHandler={addFieldHandler}
        cancelFieldHandler={cancelFieldHandler}
        action="Add"
      />
    );
  }
  if (edit.edit) {
    content = (
      <AddField
        addFieldHandler={editFieldHandler}
        cancelFieldHandler={cancelEdit}
        action="Edit"
        {...edit}
      />
    );
  }
  return <div className="w-[30rem]  font-koho p-2">{content}</div>;
};

export default CreateCollection;
