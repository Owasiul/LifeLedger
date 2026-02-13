import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const TopContributers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topContributers = [] } = useQuery({
    queryKey: ["topContributers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributers");
      return res.data;
    },
  });
  return (
    <div className="w-[90%] mx-auto my-5">
      <div className="title">
        <h1 className="text-secondary text-3xl font-bold text-center my-5">
          {" "}
          Here is our top contributers in this week{" "}
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {topContributers.map((contributor, idx) => (
          <div
            key={contributor._id || idx}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-md transition"
          >
            {/* Avatar */}
            <img
              src={contributor.photoURL}
              alt={contributor.displayName}
              className="w-16 h-16 rounded-full object-cover mb-3"
            />

            {/* Name */}
            <p className="font-semibold text-gray-800 text-sm leading-tight truncate w-full text-center">
              {contributor.displayName}
            </p>

            {/* Divider */}
            <div className="w-8 h-px bg-gray-200 my-2" />

            {/* Contributions */}
            <p className="text-2xl font-bold text-indigo-600">
              {contributor.contributedLessons}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">contributions</p>

            {/* Rank badge */}
            <span className="mt-3 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
              #{idx + 1}
            </span>
          </div>
        ))}

        {topContributers.length === 0 && (
          <p className="col-span-full text-center text-gray-400 text-sm py-6">
            No contributors yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TopContributers;
