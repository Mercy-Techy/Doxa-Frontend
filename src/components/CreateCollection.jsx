import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCollection = ({
  cancelModal,
  action,
  mutationFn,
  _id,
  defaultValue,
}) => {
  const { database } = useParams();
  const navigate = useNavigate();
  const { isPending, error, isError, mutate } = useMutation({
    mutationFn,
    onSuccess: () => navigate(`/dashboard/${database}/collection`),
  });
  const nameRef = useRef("");
  const [invalid, setInvalid] = useState(false);
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
  const deleteField = (index) => {
    const newDetails = formDetails.fields.filter((field, inx) => inx !== index);
    setformDetails((prevState) => ({
      ...prevState,
      fields: newDetails,
      show: true,
      showFields: false,
    }));
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
          defaultValue={defaultValue}
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
                <span className="bg-stone-100 rounded-lg ">
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
      <form onSubmit={addFieldHandler}>
        <div className="flex gap-4 items-center my-2">
          <label className="font-bold">Field name:</label>
          <input
            type="text"
            name="name"
            className="outline-none border border-authblue text-black font-semibold text-[1rem] mt-2 flex-1 p-2 rounded-lg"
          />
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="font-bold">Data Type:</label>
          <select
            type="text"
            name="dataType"
            className="outline-none border border-authblue text-black font-semibold text-[1rem] mt-2 flex-1 p-2 rounded-lg"
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
          <label className="font-bold">Required:</label>
          <select
            type="text"
            name="required"
            className="outline-none border border-authblue text-black font-semibold text-[1rem] mt-2 flex-1 p-2 rounded-lg"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="font-bold">Unique:</label>
          <select
            type="text"
            name="unique"
            className="outline-none border border-authblue text-black font-semibold text-[1rem] mt-2 flex-1 p-2 rounded-lg"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="text-center">
          <button
            className="text-white bg-authblue text-sm px-10 py-2 rounded-md font-semibold mt-6"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
  return <div className="w-[30rem]  font-koho p-2">{content}</div>;
};

export default CreateCollection;
