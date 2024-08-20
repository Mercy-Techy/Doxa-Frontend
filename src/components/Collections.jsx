import Collection from "./Collection";
import { fetchCollection } from "../http";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Collections = () => {
  const { database } = useParams();
  const { isError, data, isSuccess } = useQuery({
    queryFn: () => fetchCollection(database),
    queryKey: ["collections", database],
  });

  let content = (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
    </ul>
  );
  if (data) {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16 gap-5">
        {data.map((collection) => (
          <Collection
            key={collection._id}
            collection={collection}
            database={database}
          />
        ))}
      </ul>
    );
  }
  if ((isSuccess && !data) || (isSuccess && data?.length == 0) || isError) {
    content = <p>You have no collections in your database</p>;
  }

  return <>{content}</>;
};

export default Collections;
