import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const UserLessons = () => {
  const { user } = useAuth();
  const { userData } = useUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { refetch, data: lessons = [] } = useQuery({
    queryKey: ["lessons", user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${user?.displayName}`);
      return res.data;
    },
  });
  // delete post
  const handleDeletePost = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/lessons/${id}`);

          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="my-5">
        <div className="overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium hidden md:table-cell"
                >
                  No.
                </th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">
                  Visibility
                </th>
                <th className="px-4 py-3 font-medium hidden xl:table-cell">
                  Access
                </th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">
                  Stats
                </th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {lessons.map((lesson, idx) => (
                <tr
                  key={lesson._id}
                  className="border-t text-accent hover:bg-base-200/50 transition-colors"
                >
                  {/* No. - Hidden on mobile */}
                  <td className="px-4 py-4 hidden md:table-cell">{idx + 1}</td>

                  {/* Title - Always visible */}
                  <td className="px-4 py-4">
                    <div className="min-w-[150px]">
                      <p className="font-medium text-primary line-clamp-2">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-secondary mt-1">
                        {new Date(lesson.createdAt).toLocaleDateString()}
                      </p>
                      {/* Show visibility badge on mobile */}
                      <span className="inline-block lg:hidden mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lesson.visibility === "public"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {lesson.visibility}
                        </span>
                      </span>
                    </div>
                  </td>

                  {/* Visibility - Hidden on mobile/tablet */}
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                        lesson.visibility === "public"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {lesson.visibility}
                    </span>
                  </td>

                  {/* Access Level - Hidden on mobile/tablet */}
                  <td className="px-4 py-4 hidden xl:table-cell">
                    <div
                      className={
                        userData?.isPremium === false
                          ? "tooltip tooltip-top"
                          : ""
                      }
                      data-tip={
                        userData?.isPremium === false
                          ? "Upgrade to Premium to create paid lessons"
                          : undefined
                      }
                    >
                      <select
                        defaultValue={lesson.accessLevel || "free"}
                        disabled={userData?.isPremium === false}
                        className={`select select-sm select-bordered w-full max-w-[140px] ${userData?.isPremium === false ? "bg-base-200 text-base-content/40 cursor-not-allowed" : "select-primary"}`}
                      >
                        {" "}
                        <option value="free">Free</option>{" "}
                        <option value="premium">💎 Premium</option>{" "}
                      </select>
                    </div>
                  </td>

                  {/* Stats - Hidden on mobile */}
                  <td className="px-4 py-4 text-sm text-accent hidden sm:table-cell whitespace-nowrap">
                    👍 {lesson.likes?.length || 0} | ⭐
                  </td>

                  {/* Actions - Always visible but responsive */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col sm:flex-row gap-2 min-w-25">
                      <button
                        onClick={() => navigate(`/all-lessons/${lesson._id}`)}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                      >
                        Details
                      </button>

                      <button className="px-3 py-1.5 text-xs sm:text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors whitespace-nowrap">
                        Update
                      </button>

                      <button
                        onClick={() => handleDeletePost(lesson._id)}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {lessons.length === 0 && (
            <div className="text-center py-12 text-base-content/60">
              <p className="text-lg font-medium">No lessons yet</p>
              <p className="text-sm mt-2">
                Create your first lesson to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLessons;
