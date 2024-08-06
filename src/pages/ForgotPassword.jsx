import background from "../assets/passwordbackground.png";
import animation from "../assets/passwordmotion.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import Input from "../components/Input";
import { LimeButton } from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { requestresend } from "../http";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import ResetPassword from "../components/ResetPassword";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const email = useRef(null);

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: requestresend,
    onSuccess: () => setIsOpen(true),
  });

  const submitHandler = () => {
    const emailAddress = email?.current?.value;
    mutate({ email: emailAddress, type: "resetPassword" });
  };

  const toggleModal = () => setIsOpen(false);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  return (
    <>
      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <ResetPassword email={email.current?.value} />
      </Modal>
      <div className="font-koho lg:flex w-full lg:h-[100vh]">
        <div
          className="w-full bg-no-repeat bg-cover text-white flex flex-col justify-around items-center p-8  gap-10"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="lg:mt-10 text-center">
            <img src={logo} alt="logo" className="w-10" />
            <p className="font-bold text-lg">DOXA</p>
          </div>
          <h1 className="font-semibold text-2xl lg:text-4xl">
            Forgot Password?
          </h1>
          <p className="font-medium lg:text-2xl text-center ">
            Simply reset your password to go <br /> back to your workflow.
          </p>
          <img
            src={animation}
            alt=""
            className="mt-5 max-w-[200px] max-h-[200px]"
          />
        </div>
        <div className="w-full px-6 lg:px-16 py-16 flex flex-col justify-around text-center">
          <div>
            <h1 className="font-medium text-2xl lg:text-4xl text-center">
              Reset <span className="text-textlime">Password</span>
            </h1>
            <p className="text-sm my-2">
              Enter email address below to rest your password
            </p>
          </div>
          <div className="text-start">
            <Input
              label="Email"
              name="email"
              type="text"
              inputRef={email}
              icon={emailIcon}
              placeholder="Enter your email address"
            />
          </div>
          <div className="text-center">
            <LimeButton
              type="button"
              styles="mt-10 text-center w-full"
              disabled={isPending}
              handleFn={submitHandler}
            >
              {isPending && (
                <span className="loading loading-spinner loading-sm mx-7 my-0"></span>
              )}
              {!isPending && "Continue To Reset"}
            </LimeButton>
          </div>
          <p className="text-sm mt-4 lg:mt-0">
            Follow the instructions sent to your email address to <br /> reset
            your password.
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
