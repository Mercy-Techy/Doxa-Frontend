const AddField = ({ addFieldHandler, cancelFieldHandler, action, name }) => {
  return (
    <form onSubmit={addFieldHandler}>
      <div className="flex gap-4 items-center my-2">
        <label className="font-bold">Field name:</label>
        <input
          type="text"
          name="name"
          defaultValue={name}
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
      <div className="text-center flex gap-5 justify-center">
        <button
          className="text-authblue border border-authblue text-sm px-10 py-2 rounded-md font-semibold mt-6"
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
  );
};

export default AddField;
