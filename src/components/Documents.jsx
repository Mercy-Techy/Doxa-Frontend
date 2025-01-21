import { useQuery } from "@tanstack/react-query";
import { fetchCollectionDetails, fetchDocument } from "../http";
import { useParams } from "react-router-dom";
import Document from "./Document";
import { useState } from "react";
import Pagination from "./Pagination";

const Documents = () => {
  const { collection, database } = useParams();
  const [page, setPage] = useState(1);
  const { isError, data, isSuccess, isLoading } = useQuery({
    queryFn: () => fetchDocument(collection, database, page),
    queryKey: ["collections", database, "documents", collection, page],
  });
  const { data: collectionDetails } = useQuery({
    queryKey: ["collections", database, collection],
    queryFn: () => fetchCollectionDetails(collection, database),
  });

  let content = (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
      <li className="shadow-lg rounded-xl mt-10 w-[280px] h-48 animate-pulse bg-stone-100"></li>
    </ul>
  );

  if (!isLoading) {
    if (data) {
      content = (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((document) => (
              <Document
                documentDetails={document}
                key={document._id}
                collectionDetails={collectionDetails}
              />
            ))}
          </ul>
          {data.totalItems > 0 && (
            <Pagination page={page} setPage={setPage} data={data} />
          )}
        </>
      );
    }
    if ((isSuccess && !data) || (isSuccess && data?.length == 0) || isError) {
      content = <p>You have no document</p>;
    }
  }

  return <>{content}</>;
};

export default Documents;
