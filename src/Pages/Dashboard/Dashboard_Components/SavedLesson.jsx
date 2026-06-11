import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Button } from "@heroui/react";

const SavedLesson = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { refetch, data: savedLessons = [] } = useQuery({
    queryKey: ["savedLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/saved-lessons?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemoveSavedLesson = async (id) => {
    try {
      await axiosSecure.delete(`/saved-lessons/${id}`);
      Swal.fire({
        title: "Removed",
        text: "Lesson removed from your saved list.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to remove saved lesson",
        icon: "error",
      });
    }
  };

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
                      <Button
                        onClick={() => handleViewSavedLesson(sl?.lessonId)}
                        color="success"
                        size="sm"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleRemoveSavedLesson(sl?._id)}
                        color="danger"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {savedLessons.length === 0 && (
            <div className="text-center py-12 text-base-content/60">
              <p className="text-lg font-medium">No saved lessons yet</p>
              <p className="text-sm mt-2">
                Browse lessons and bookmark the ones you want to keep.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedLesson;
