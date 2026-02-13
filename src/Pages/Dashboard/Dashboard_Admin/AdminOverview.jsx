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
  return (
    <div className="w-[90%] my-5 mx-auto space-y-5">
      <div className="title">
        <h1 className="text-4xl font-bold">
          {" "}
          Here is All the data of your platform{" "}
        </h1>
      </div>
      {/* lessons created */}
      <div className="body grid md:grid-cols-2 grid-cols-1 gap-3">
        <div className="lessons p-4 justify-center items-center bg-green-500 rounded-xl">
          <h1 className="text-xl font-bold">All Lessons Created</h1>
          <span className="font-bold text-2xl"> {lessons.length} </span>
        </div>
        {/* users length */}
        <div className="Users p-4 justify-center items-center bg-red-500 rounded-xl">
          <h1 className="text-xl font-bold">All Users</h1>
          <span className="font-bold text-2xl"> {users.length} </span>
        </div>
        {/* repoted lessons */}
        <div className="Users p-4 justify-center items-center bg-blue-500 rounded-xl">
          <h1 className="text-xl font-bold">Reported Lessons</h1>
          {/* TODO: have to create */}
          <span className="font-bold text-2xl"> 0 </span>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
