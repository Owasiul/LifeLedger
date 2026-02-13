import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons`);
      return res.data;
    },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
 const {data: reports = []} = useQuery({
         queryKey: ["reports"],
         queryFn: async() =>{
             const res = await axiosSecure.get(`/reports`)
             return res.data
         }
     })
  return (
    <div className="w-[90%] my-10 mx-auto space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-secondary">Platform Overview</h1>
        <p className="text-primary mt-2">
          Here is all the data of your platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Lessons */}
        <div className="p-6 bg-green-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-green-700">
            Lessons Created
          </h2>
          <span className="block text-4xl font-bold text-green-900 mt-2">
            {lessons.length}
          </span>
        </div>

        {/* Users */}
        <div className="p-6 bg-red-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-red-700">Users</h2>
          <span className="block text-4xl font-bold text-red-900 mt-2">
            {users.length}
          </span>
        </div>

        {/* Reported Lessons */}
        <div className="p-6 bg-blue-100 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-blue-700">
            Reported Lessons
          </h2>
          <span className="block text-4xl font-bold text-blue-900 mt-2">
            {" "}
            {reports.length}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
