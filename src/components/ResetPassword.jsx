import { useMutation } from "@tanstack/react-query";
import { LimeButton } from "./Button";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { requestresend, resetPassword, verifyEmail } from "../http";
import { useNavigate } from "react-router-dom";
import animation from "../assets/resetMotion.png";
import Input from "../components/Input";
import passwordIcon from "../assets/password.png";

const ResetPassword = ({ email }) => {
  const navigate = useNavigate();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [token, setToken] = useState({
    inp1: "",
    inp2: "",
    inp3: "",
    inp4: "",
    inp5: "",
    inp6: "",
  });
  const [existingToken, setExistingToken] = useState();
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => navigate("/login"),
  });

  const {
    mutate: requestMutate,
    isPending: requestPending,
    error: requestError,
    isError: requestIsError,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: requestresend,
  });

  const handleSubmitToken = (name, value) => {
    if (value) {
      setToken((prevToken) => ({ ...prevToken, [name]: value.trim() }));
    }
  };
  const closePasswordModal = () => {
    if (invalidPassword) {
      setInvalidPassword(false);
    }
  };
  const handleResetPassword = () => {
    const password = newPassword.current?.value?.trim();
    if (password !== confirmPassword.current?.value?.trim()) {
      return setInvalidPassword(true);
    } else {
      mutate({ password, token: existingToken, email });
    }
  };
  const summitToken = () => {
    let tokenDetails = "";
    Object.values(token).forEach((value) => (tokenDetails += value));
    setExistingToken(tokenDetails);
  };

  const resendToken = () => {
    requestMutate({ email, type: "resetPassword" });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (requestIsError) {
      toast.error(
        requestError?.response?.data?.message || requestError.message
      );
    }
  }, [requestError, requestIsError]);
  useEffect(() => {
    if (invalidPassword) {
      toast.error("Passwords do not match.");
    }
  }, [invalidPassword]);

  let complete = true;
  for (let key of Object.keys(token)) {
    if (!token[key] || token[key].length == 0) complete = false;
  }

  return (
    <div
      className={`${
        existingToken ? "p-2" : "p-8"
      } flex flex-col justify-between h-[90vh] text-center`}
    >
      <div>
        <div className="font-semibold text-3xl text-authblue">
          Reset Password
        </div>
        {!existingToken ? (
          <p className="text-xl font-normal mt-2">
            A 6-digit verification code has been sent to your email address.
            <br /> Enter the code to rest your password.
          </p>
        ) : (
          <p className="text-sm mx-16 font-normal mt-2">
            Enter new password to reset
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <img
          src={animation}
          alt="logo"
          className="max-h-[200px] max-w-[200px]"
        />
      </div>
      {!existingToken && (
        <div className="h-2/5 flex flex-col justify-between">
          <div>
            <p className="text-lg font-normal">Type in below</p>
            <div className="flex gap-2 justify-center my-2">
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp1", event.target.value)
                }
              />
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp2", event.target.value)
                }
              />
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp3", event.target.value)
                }
              />
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp4", event.target.value)
                }
              />
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp5", event.target.value)
                }
              />
              <input
                type="text"
                className="outline-none w-12 h-12 border rounded-lg border-stone-300  text-center"
                onChange={(event) =>
                  handleSubmitToken("inp6", event.target.value)
                }
              />
            </div>
            <p className="text-sm">
              Didn’t get the code? Resend{" "}
              <span
                className={`text-authblue font-bold cursor-pointer ${
                  requestPending && "loading loading-spinner loading-xs"
                }`}
                onClick={resendToken}
              >
                {!requestPending && "code"}
              </span>
            </p>
          </div>
          <div className="text-center">
            <LimeButton
              type="submit"
              styles={`mt-10 text-center w-full ${
                isPending ? "bg-lime-200" : !complete ? "bg-lime-200" : ""
              }`}
              disabled={isPending || !complete}
              handleFn={summitToken}
            >
              {isPending && (
                <span className="loading loading-spinner loading-md mx-7"></span>
              )}
              {!isPending && <span className="md:text-2xl">Continue</span>}
            </LimeButton>
          </div>
        </div>
      )}
      {existingToken && (
        <div className="text-start">
          <Input
            label="New Password"
            name="password"
            type="password"
            inputRef={newPassword}
            icon={passwordIcon}
            placeholder="Enter your password"
            labelStyle="text-lg"
            handleFn={closePasswordModal}
          />
          <Input
            label="Confirm Password"
            name="password"
            type="password"
            inputRef={confirmPassword}
            icon={passwordIcon}
            placeholder="confirm password"
            labelStyle="text-lg"
            handleFn={closePasswordModal}
          />
          <div className="text-center">
            <LimeButton
              type="submit"
              styles={`mt-10 text-center w-full ${
                isPending ? "bg-lime-200" : ""
              }`}
              disabled={isPending}
              handleFn={handleResetPassword}
            >
              {isPending && (
                <span className="loading loading-spinner loading-md mx-7"></span>
              )}
              {!isPending && <span className="text-lg">Reset Password</span>}
            </LimeButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
