import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";

const SavedLesson = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  //   see saved lessons
  const { refetch, data: savedLessons = [] } = useQuery({
    queryKey: ["savedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/saved-lessons?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });
  //   handle remove from saved lesson
  const handleRemoveSavedLesson = (id) => {
    const res = axiosSecure.delete(`/saved-lessons/${id}`);
    refetch();
    return res.data;
  };
  // handle view details
  const handleViewSavedLesson = (id) => {
    navigate(`/all-lessons/${id}`);
  };
  return (
    <div>
      <div className="my-5">
        <div className="overflow-x-auto bg-neutral-primary-soft shadow-sm rounded-lg border border-default">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-neutral-secondary-soft border-b border-default">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-medium hidden md:table-cell"
                >
                  No.
                </th>
                <th className="px-4 py-3 font-medium">Important Info</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedLessons.map((sl, idx) => (
                <tr
                  key={sl._id}
                  className="hover:bg-neutral-secondary-soft transition-colors border-b"
                >
                  <td className="px-4 py-3 hidden md:table-cell">{idx + 1}</td>
                  <td className="px-4 py-3">{sl.lessonTitle}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleViewSavedLesson(sl?.lessonId)}
                        className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleRemoveSavedLesson(sl?._id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavedLesson;
