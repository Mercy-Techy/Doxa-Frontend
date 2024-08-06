import background from "../assets/loginbg.png";
import animation from "../assets/loginimage.png";
import logo from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import Input from "../components/Input";
import { LimeButton } from "../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../http";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addToken } from "../util/auth";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      addToken(data.data.token);
      return navigate("/dashboard");
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userDetails = Object.fromEntries(formData);
    mutate(userDetails);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className="font-koho lg:flex w-full h-[100vh]">
        <div
          className="w-full bg-no-repeat bg-cover text-white flex flex-col justify-around items-center p-8  gap-10"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="lg:mt-10 text-center">
            <img src={logo} alt="logo" className="w-12" />
            <p className="font-bold text-lg">DOXA</p>
          </div>
          <h1 className="font-semibold text-2xl lg:text-4xl">Welcome Back</h1>
          <p className="font-medium lg:text-2xl text-center">
            Log in to your account to manage <br /> your projects efficiently
          </p>
          <img src={animation} alt="" className="max-w-[300px] max-h-[300px]" />
        </div>
        <div className="w-full px-6 lg:px-16 py-16">
          <h1 className="font-medium text-2xl lg:text-4xl text-center">
            Welcome Back To <span className="text-textlime">DOXA</span>!
          </h1>
          <form onSubmit={submitHandler} className="mt-16">
            <Input
              label="Email"
              name="email"
              type="text"
              icon={emailIcon}
              placeholder="Enter your email address"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              icon={passwordIcon}
              placeholder="Enter your password"
            />
            <Link to="/forgot-password">
              <div className="text-sm mt-2 link link-primary text-right">
                forgot password
              </div>
            </Link>

            <div className="text-center">
              <LimeButton
                type="submit"
                styles="my-10 text-center"
                disabled={isPending}
              >
                {isPending && (
                  <span className="loading loading-spinner loading-sm mx-7"></span>
                )}
                {!isPending && "LOGIN"}
              </LimeButton>
            </div>
          </form>
          <div className="font-bold text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-authblue">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
