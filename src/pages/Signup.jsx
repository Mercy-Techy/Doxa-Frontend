import background from "../assets/loginbg.png";
import animation from "../assets/loginmotion.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import Input from "../components/Input";
import { LimeButton } from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../http";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import Verify from "../components/VerifyToken";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const email = useRef();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => setIsOpen(true),
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userDetails = Object.fromEntries(formData);
    email.current = userDetails.email;
    mutate(userDetails);
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
        <Verify email={email.current} />
      </Modal>
      <div className="font-koho lg:flex w-full h-full">
        <div
          className="w-full bg-no-repeat bg-cover text-white flex flex-col justify-around items-center p-8 lg:pt-16 gap-10"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="lg:mt-10 text-center">
            <img src={logo} alt="logo" className="w-12" />
            <p className="font-bold text-lg">DOXA</p>
          </div>
          <h1 className="font-semibold text-2xl lg:text-4xl">
            Welcome to Pitch DOXA!
          </h1>
          <p className="font-medium lg:text-2xl text-center">
            Register to gain access to your
            <br /> personalised and matchless database <br />
            system
          </p>
          <img src={animation} alt="" className="max-w-[300px] max-h-[300px]" />
        </div>
        <div className="w-full px-6 lg:px-16 py-8">
          <h1 className="font-medium text-2xl lg:text-4xl text-center">
            Get started on <span className="text-textlime">DOXA</span>!
          </h1>
          <form onSubmit={submitHandler} className="mt-16">
            <Input
              label="First Name"
              name="firstname"
              type="text"
              placeholder="Enter your first name"
            />
            <Input
              label="Last Name"
              name="lastname"
              type="text"
              placeholder="Enter your last name"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              icon={emailIcon}
              placeholder="Enter your email address"
            />
            <Input
              label="Phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              icon={passwordIcon}
              placeholder="Enter your password"
            />

            <div className="text-center">
              <LimeButton
                type="submit"
                styles="my-10 text-center"
                disabled={isPending}
              >
                {isPending && (
                  <span className="loading loading-spinner loading-sm mx-7"></span>
                )}
                {!isPending && "REGISTER"}
              </LimeButton>
            </div>
          </form>
          <div className="font-bold text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-authblue">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
