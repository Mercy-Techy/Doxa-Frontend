import adminuser from "../assets/admin-user.png";
import admindoc from "../assets/admin-doc.png";
import admincol from "../assets/admin-col.png";
import admindb from "../assets/admin-db.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  blockUser,
  fetchDashboardDetails,
  fetchDBs,
  fetchUsers,
  lockDb,
} from "../http";
import { Link } from "react-router-dom";

const DashBoardAdmin = () => {
  const { data } = useQuery({
    queryFn: fetchDashboardDetails,
    queryKey: ["db-state"],
  });
  const { data: users, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsers(1),
  });

  const { data: dbs, refetch: dbRefetch } = useQuery({
    queryKey: ["admin-dbs"],
    queryFn: () => fetchDBs(1),
  });
  const { mutate } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => refetch(),
  });
  const { mutate: dbMutate } = useMutation({
    mutationFn: lockDb,
    onSuccess: () => dbRefetch(),
  });

  return (
    <div className="bg-bggray px-10 py-8 p mt-6 min-h-screen w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded  h-[130px] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Users</span>
            <img src={adminuser} alt="" className="h-[35px] w-[35px]" />
          </div>
          <div className="font-[500] text-sm">{data?.users || 0} People</div>
        </div>
        <div className="bg-white rounded h-[130px] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Databases</span>
            <img src={admindb} alt="" className="h-[35px] w-[35px]" />
          </div>
          <div className="font-[500] text-sm">{data?.DBs || 0} in total</div>
        </div>
        <div className="bg-white rounded h-[130px] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Collection</span>
            <img src={admincol} alt="" className="h-[35px] w-[35px]" />
          </div>
          <div className="font-[500] text-sm">
            {data?.collections || 0} in total
          </div>
        </div>
        <div className="bg-white rounded h-[130px] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Documents</span>
            <img src={admindoc} alt="" className="h-[35px] w-[35px]" />
          </div>
          <div className="font-[500] text-sm">
            {data?.documents || 0} in total
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-xl">All Databases</span>
          <span className="font-bold text-xl">See More</span>
        </div>
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
            {dbs?.data?.slice(0, 3)?.map((db) => {
              return (
                <tr className="bg-white text-[14px]" key={db._id}>
                  <td className="py-4 pl-10 rounded-tl capitalize">
                    {db?.name}
                  </td>
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
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between w-full">
          <span className="font-bold text-xl">All Users</span>
          <Link to="users">
            <span className="font-bold text-xl">See More</span>
          </Link>
        </div>
        <table className="min-w-full text-left mt-2">
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
            {users?.data?.slice(0, 3)?.map((us) => {
              return (
                <tr className="bg-white text-[14px]" key={us._id}>
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
      </div>
    </div>
  );
};

export default DashBoardAdmin;
