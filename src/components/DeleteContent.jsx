import deleteIcon from "../assets/deletegif.png";

const DeleteContent = ({ text, toggleModal, deleteFunction, isPending }) => (
  <div className="flex flex-col items-center w-80">
    <img src={deleteIcon} alt="delete" />
    <p>
      Are you sure you want to <br /> delete {text}? Action <br /> cannot be
      undone.
    </p>
    <div className="mt-10 flex gap-5 items-center justify-center">
      <button
        className="text-white bg-authblue text-sm px-12 py-2 rounded-md font-semibold"
        onClick={toggleModal}
      >
        No
      </button>
      <button
        className="text-authblue border border-authblue text-sm px-12 py-2 rounded-md font-semibold"
        onClick={deleteFunction}
      >
        {isPending && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        {!isPending && "Yes"}
      </button>
    </div>
  </div>
);

export default DeleteContent;
