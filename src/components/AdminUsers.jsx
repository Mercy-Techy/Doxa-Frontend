import { useMutation, useQuery } from "@tanstack/react-query";
import { blockUser, fetchUsers } from "../http";
import { useState } from "react";
import Pagination from "./Pagination";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => fetchUsers(page),
  });

  const { mutate } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => refetch(),
  });

  return (
    <div className="bg-bggray px-10 py-8 p mt-6 min-h-screen w-full">
      <table className="min-w-full text-left">
        <thead className=" bg-[#F0F6FF] text-[15px] font-bold">
          <tr>
            <th className="py-4 pl-10 rounded-tl">Name</th>
            <th className="py-4">Email Address</th>
            <th className="py-4">Phone Number</th>
            <th className="py-4">Databases</th>
            <th className="py-4">Collections</th>
            <th className="py-4">Documents</th>
            <th className="py-4 pr-10 rounded-tr">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((us) => {
            return (
              <tr className="bg-white text-[14px]" key={us?._id}>
                <td className="py-4 pl-10 rounded-tl capitalize">
                  {us?.lastname + " " + us?.firstname}
                </td>
                <td className="py-4">{us?.email}</td>
                <td className="py-4">{us?.phone}</td>
                <td className="py-4">{us?.noOfDBs || 0}</td>
                <td className="py-4">{us?.noOfCollections || 0}</td>
                <td className="py-4">{us?.noOfDocuments || 0}</td>
                <td
                  className="py-4 pr-10 rounded-tr text-red-500 font-bold cursor-pointer"
                  onClick={() =>
                    mutate({ _id: us?._id, value: !us?.deactivated })
                  }
                >
                  {us?.deactivated ? "Unblock User" : "Block User"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination data={data} page={page} setPage={setPage} />
    </div>
  );
};

export default AdminUsers;
