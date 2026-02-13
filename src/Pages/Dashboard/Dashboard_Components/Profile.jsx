import React from "react";
import useUser from "../../../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Crown } from "lucide-react";

const Profile = () => {
  const { userData } = useUser();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: profile = [] } = useQuery({
    queryKey: ["profile", user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/${user?.displayName || userData.displayName}`,
      );
      console.log(res.data);
      return res.data;
    },
  });
  // format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  //   console.log(profile);
  return (
    <div>
      <div className="bg-linear-to-r from-primary to-primary/80 text-white rounded-2xl shadow-lg p-6 md:p-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image */}
          <div className="shrink-0">
            <img
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-md"
              src={user?.photoURL || "/default-avatar.png"}
              alt="User"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-6">
            {/* Name */}
            <div className="flex flex-row items-center gap-5">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {user?.displayName || "User Name"}
              </h1>
              {userData?.role === "admin" && (
                <span>
                  {" "}
                  <Crown size={40} className="text-yellow-500"></Crown>{" "}
                </span>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center hover:scale-105 transition-transform duration-300">
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-white/80 mt-1">Lessons Created</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center hover:scale-105 transition-transform duration-300">
                <p className="text-3xl font-bold">1</p>
                <p className="text-sm text-white/80 mt-1">Lessons Saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* His Lessons */}
      <div className="border-t border-gray-200 py-5 my-5">
        <h2 className="text-xl my-3">My Public Lessons</h2>
        <div className="max-w-7xl px-4 py-10">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {profile.map((data) => (
              <div
                key={data._id}
                className="group bg-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                    {data.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {data.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t text-xs text-gray-400">
                    <span>{formatDate(data.createdAt)}</span>
                    <span className="text-primary font-medium cursor-pointer hover:underline">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
