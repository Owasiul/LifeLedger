import { useQuery } from "@tanstack/react-query";
import { BookOpenTextIcon, Heart } from "lucide-react";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // lessons
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${user?.displayName}`);
      return res.data;
    },
  });
  // users data
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  // saved lessons
  const { data: savedLessons = [] } = useQuery({
    queryKey: ["savedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/saved-lessons?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <div className="title space-y-1">
        <h2 className="font-black text-3xl"> Overview Dashboard</h2>
        <p className="text-sm font-medium">Here is your acivity summery</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        {/* Lessons Created */}
        <div className="bg-linear-to-r from-sky-100 to-sky-200 rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">
              Total Lessons Created
            </h2>
            <p className="text-4xl font-bold text-slate-900 mt-2">
              {users.contributedLessons || 0}{" "}
            </p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center bg-sky-300 rounded-full">
            <BookOpenTextIcon size={32} className="text-slate-800" />
          </div>
        </div>

        {/* Favorites */}
        <div className="bg-linear-to-r from-green-200 to-green-300 rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h2 className="text-lg font-semibold text-slate-700">
              Total Saved Favorites
            </h2>
            <p className="text-4xl font-bold text-slate-900 mt-2">
              {" "}
              {savedLessons.length}{" "}
            </p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center bg-green-400 rounded-full">
            <Heart size={32} className="text-slate-800" />
          </div>
        </div>
      </div>
      <div className="my-6 ">
        {/* users added lessons */}
        <div className="shadow-md bg-gray-200 p-2 h-screen rounded-xl">
          <div className="title">
            <h2 className="text-xl font-bold my-1 text-primary ">
              Here is your recently added Lessons
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            {lessons.map((data) => {
              return (
                <div
                  key={data?._id}
                  className="group flex flex-row items-center justify-between p-3 rounded-2xl bg-secondary border border-transparen transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    {/* Thumbnail Container */}
                    <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={data.image}
                        alt={data.title}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-slate-800 leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-64">
                        {" "}
                        {data.title}{" "}
                      </h3>
                      <span className="text-sm text-slate-500 font-medium">
                        {/* Optional: Format date string if it's a raw date */}
                        {new Date(data.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="shadow-md bg-gray-200 p-2 h-screen rounded-xl"></div> */}
      </div>
    </div>
  );
};

export default Overview;
