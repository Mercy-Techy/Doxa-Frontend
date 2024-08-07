import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCollectionDetails } from "../http";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Schema = () => {
  const { collection, database } = useParams();
  const { data, isError, error } = useQuery({
    queryKey: ["collection", database, collection, "schema"],
    queryFn: () => fetchCollectionDetails(collection, database),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }, [isError, error]);

  let content = <p>Loading schema...</p>;
  if (data) {
    content = (
      <>
        <h1 className="text-2xl text-center font-bold mt-10 uppercase mb-5">
          {data.name}
        </h1>
        <ul className="font-bold capitalize">
          {data.fields.map((field, index) => (
            <li className="my-4 bg-stone-50 rounded-lg p-4 " key={index}>
              <div>
                <p>Name: {field.name}</p>
                <p>Data type: {field.dataType}</p>
                <p>Unique: {`${field.unique}`}</p>
                <p>Required: {`${field.required}`}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  return <>{content}</>;
};

export default Schema;
