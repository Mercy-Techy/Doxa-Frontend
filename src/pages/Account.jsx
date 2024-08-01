import { Link, useNavigate } from "react-router-dom";
import { useText } from "../store/DashBoardContext";
import { useEffect } from "react";
import woman from "../assets/woman1.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePassword,
  editUserDetails,
  fetchUserDetails,
  uploadAvatar,
} from "../http";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { queryClient } from "../App";
import passwordIcon from "../assets/password.png";
import Input from "../components/Input";
import { deleteToken } from "../util/auth";
import { toast } from "react-toastify";

const Account = () => {
  const { accountFn } = useText();
  const navigate = useNavigate();

  const { isPending, data, isError, error } = useQuery({
    queryFn: fetchUserDetails,
    queryKey: ["user"],
  });
  const {
    error: aError,
    isError: aIsError,
    mutate: aMutate,
    isPending: aIsPending,
  } = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
  const {
    error: passwordError,
    isError: passwordIsError,
    mutate: passwordMutate,
    isPending: passwordIsPending,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      deleteToken();
      return navigate("/login");
    },
  });
  const {
    error: userError,
    isError: userIsError,
    mutate: userMutate,
    isPending: userIsPending,
  } = useMutation({
    mutationFn: editUserDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  useEffect(() => accountFn(), []);
  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);
  useEffect(() => {
    if (aIsError) {
      toast.error(aError?.response?.data?.message || aError.message);
    }
  }, [aIsError, aError]);
  useEffect(() => {
    if (passwordIsError) {
      toast.error(
        passwordError?.response?.data?.message || passwordError.message
      );
    }
  }, [passwordIsError, passwordError]);
  useEffect(() => {
    if (userIsError) {
      toast.error(userError?.response?.data?.message || userError.message);
    }
  }, [userIsError, userError]);

  const handleUpload = (event) => {
    const image = event.target.files[0];
    aMutate({ image });
  };
  const passwordHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const passwordDetails = Object.fromEntries(formData);
    passwordMutate(passwordDetails);
  };
  const profileHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userDetails = Object.fromEntries(formData);
    console.log(userDetails);
    userMutate(userDetails);
  };

  let content = <p>Fetching details...</p>;
  if (data) {
    content = (
      <div className="flex flex-col items-center mt-14">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={data?.avatar?.url || woman}
              alt="avatar"
              className="rounded-full w-[150px] h-[150px] object-cover"
            />
            <button
              className="absolute font-bold text-authblue right-3 top-3 text-lg"
              disabled={aIsPending}
            >
              <MdOutlineModeEditOutline />
            </button>
            <input
              type="file"
              onChange={handleUpload}
              disabled={aIsPending}
              className="absolute font-bold text-authblue w-4 right-3 h-4 top-3 z-20 opacity-0"
            />
          </div>
          <p className="mt-2 font-bold text:lg capitalize">
            {data.lastname} {data.firstname}
          </p>
        </div>
        <form className="w-full lg:w-2/3 mt-16 py-2" onSubmit={profileHandler}>
          <div>
            <label className="font-bold mb-2 block">LAST NAME</label>
            <input
              type="text"
              name="lastname"
              defaultValue={data.lastname}
              className="w-full bg-stone-50 border border-stone-300 p-2 rounded-lg"
            />
          </div>
          <div className="my-6">
            <label className="font-bold mb-2 block">FIRST NAME</label>
            <input
              type="text"
              name="firstname"
              defaultValue={data.firstname}
              className="w-full bg-stone-50 border border-stone-300 p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="font-bold mb-2 block">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={data.phone}
              className="w-full bg-stone-50 border border-stone-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-authblue border border-authblue text-sm px-12 py-2 rounded-md font-bold text-white mt-10"
              type="submit"
            >
              {userIsPending && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              {!userIsPending && "Update"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white px-10 py-8 p mt-10 min-h-screen">
      <h1 className="font-bold text-2xl">MY ACCOUNT</h1>
      {content}
      <form className="w-full lg:w-2/3 mt-16 py-2" onSubmit={passwordHandler}>
        <h1 className="text-xl font-bold text-authblue">Change Password</h1>
        <Input
          label="Old Password"
          name="oldPassword"
          type="password"
          icon={passwordIcon}
          labelStyle="text-sm font-bold"
          placeholder="Enter your old password"
        />
        <Input
          label="New Password"
          name="password"
          type="password"
          icon={passwordIcon}
          labelStyle="text-sm font-bold"
          placeholder="Enter your new password"
        />
        <button
          className="bg-authblue border border-authblue text-sm px-12 py-2 rounded-md font-bold text-white mt-10"
          type="submit"
        >
          {passwordIsPending && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {!passwordIsPending && "Update"}
        </button>
      </form>
    </div>
  );
};

export default Account;
