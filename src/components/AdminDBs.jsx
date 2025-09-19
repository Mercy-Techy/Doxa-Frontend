import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDBs, lockDb } from "../http";
import Pagination from "./Pagination";
import { useState } from "react";

const AdminDBs = () => {
  const [page, setPage] = useState(1);
  const { data: dbs, refetch: dbRefetch } = useQuery({
    queryKey: ["admin-dbs", page],
    queryFn: () => fetchDBs(page),
  });
  const { mutate: dbMutate } = useMutation({
    mutationFn: lockDb,
    onSuccess: () => dbRefetch(),
  });

  return (
    <div className="bg-bggray px-10 py-8 p mt-6 min-h-screen w-full">
      <table className="min-w-full text-left mt-2">
        <thead className=" bg-[#F0F6FF] text-[15px] font-bold">
          <tr>
            <th className="py-4 pl-10 rounded-tl">Name</th>
            <th className="py-4">Collections</th>
            <th className="py-4">Documents</th>
            <th className="py-4 pr-10 rounded-tr">Action</th>
          </tr>
        </thead>
        <tbody>
          {dbs?.data?.map((db) => {
            return (
              <tr className="bg-white text-[14px]" key={db._id}>
                <td className="py-4 pl-10 rounded-tl capitalize">{db?.name}</td>
                <td className="py-4">{db?.collections || 0}</td>
                <td className="py-4">{db?.documents || 0}</td>
                <td
                  className="py-4 pr-10 rounded-tr text-red-500 font-bold cursor-pointer"
                  onClick={() =>
                    dbMutate({ id: db?._id, value: !db?.lockedByAdmin })
                  }
                >
                  {db?.lockedByAdmin ? "Unlock" : "Lock"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination data={dbs} page={page} setPage={setPage} />
    </div>
  );
};

export default AdminDBs;
