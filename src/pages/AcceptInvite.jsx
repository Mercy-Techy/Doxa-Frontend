import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { acceptInvite } from "../http";
import { useEffect, useState } from "react";

const AcceptInvite = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { isSuccess, isError, error, data } = useQuery({
    queryFn: () => acceptInvite({ token }),
    queryKey: ["invite", token],
  });

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => navigate("/login"), 5000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  let content = <span className="loading loading-spinner loading-lg"></span>;
  if (isSuccess) {
    content = <h1 className="font-bold text-2xl">{data.message}</h1>;
  }
  if (isError) {
    content = (
      <h1 className="font-bold text-2xl text-red-600">
        {error?.response?.data?.message || error.message}
      </h1>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen text-authblue">
      {content}
    </div>
  );
};

export default AcceptInvite;
