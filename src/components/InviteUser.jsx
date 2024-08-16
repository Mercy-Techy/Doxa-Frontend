import { useMutation } from "@tanstack/react-query";
import { addDatabaseUser } from "../http";
import { toast } from "react-toastify";

const InviteUser = ({ _id, cancelModal }) => {
  const { isPending, mutate } = useMutation({
    mutationFn: addDatabaseUser,
    onSuccess(data) {
      toast.success(data.message);
      cancelModal();
    },
    onError(error) {
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userDetails = Object.fromEntries(formData);
    mutate({ ...userDetails, _id });
  };
  return (
    <form
      className="flex flex-col min-w-[320px] md:w-[400px]"
      onSubmit={handleSubmit}
    >
      <div className="my-2">
        <label>Email</label>
        <input
          type="text"
          placeholder="user email"
          name="email"
          className="w-full  border border-stone-300 p-2 rounded-lg mt-1 outline-none"
        />
      </div>
      <div className="my-2">
        <label>Privilege</label>
        <select
          name="privilege"
          className="w-full  border border-stone-300 p-2 rounded-lg mt-1 outline-none"
        >
          <option value="view">-- select</option>
          <option value="view">View</option>
          <option value="edit-content">Edit Content</option>
          <option value="edit-structure">Edit Structure</option>
        </select>
      </div>
      <div className="w-full text-center">
        <button
          className="text-white bg-authblue text-sm px-14 py-2 my-4 w-1/3 rounded-md font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {!isPending && "Invite"}
        </button>
      </div>
    </form>
  );
};

export default InviteUser;
