import { useMutation } from "@tanstack/react-query";
import { LimeButton } from "./Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { requestresend, verifyEmail } from "../http";
import { useNavigate } from "react-router-dom";

const Verify = ({ email }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState({
    inp1: "",
    inp2: "",
    inp3: "",
    inp4: "",
    inp5: "",
    inp6: "",
  });

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: verifyEmail,
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

  const summitToken = () => {
    let tokenDetails = "";
    Object.values(token).forEach((value) => (tokenDetails += value));
    mutate({ email, token: tokenDetails });
  };

  const resendToken = () => {
    requestMutate({ email, type: "verifyEmail" });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
    if (requestIsError) {
      toast.error(
        requestError?.response?.data?.message || requestError.message
      );
    }
    if (isSuccess && !isError && !requestError) {
      toast.success(data.message);
    }
  }, [isError, error, requestIsError, requestError, isSuccess, data]);

  let complete = true;
  for (let key of Object.keys(token)) {
    if (!token[key] || token[key].length == 0) complete = false;
  }

  return (
    <div className="p-8 flex flex-col justify-between h-[90vh] text-center">
      <div>
        <div className="font-semibold text-3xl text-authblue">
          Verify email address
        </div>
        <p className="text-xl font-normal mt-2">
          A token has been sent to your email address.
          <br /> Enter code below to verify it’s you.
        </p>
      </div>
      <div className="h-2/5 flex flex-col justify-between">
        <div>
          <p className="text-lg font-normal">Type in below</p>
          <div className="flex gap-2 justify-center my-2">
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
              onChange={(event) =>
                handleSubmitToken("inp1", event.target.value)
              }
            />
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
              onChange={(event) =>
                handleSubmitToken("inp2", event.target.value)
              }
            />
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
              onChange={(event) =>
                handleSubmitToken("inp3", event.target.value)
              }
            />
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
              onChange={(event) =>
                handleSubmitToken("inp4", event.target.value)
              }
            />
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
              onChange={(event) =>
                handleSubmitToken("inp5", event.target.value)
              }
            />
            <input
              type="text"
              className="outline-none rounded-lg w-12 h-12 border border-stone-300  text-center"
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
            {!isPending && (
              <span className="md:text-2xl">Verify email address</span>
            )}
          </LimeButton>
        </div>
      </div>
    </div>
  );
};

export default Verify;
