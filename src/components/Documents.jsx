import { useQuery } from "@tanstack/react-query";
import { fetchDocument } from "../http";
import { useParams } from "react-router-dom";
import Document from "./Document";

const Documents = () => {
  const { collection, database } = useParams();
  const { isError, data, isSuccess } = useQuery({
    queryFn: () => fetchDocument(collection, database),
    queryKey: ["collection", "documents", database, collection],
  });

  let content = (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
    </ul>
  );

  if (data) {
    content = (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((document) => (
          <Document documentDetails={document} key={document._id} />
        ))}
      </ul>
    );
  }
  if ((isSuccess && !data) || (isSuccess && data?.length == 0) || isError) {
    content = <p>You have no document</p>;
  }

  return <>{content}</>;
};

export default Documents;
