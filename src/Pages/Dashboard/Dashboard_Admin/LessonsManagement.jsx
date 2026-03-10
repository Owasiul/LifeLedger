import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  Star,
  Trash2,
  Eye,
  BookOpen,
  MoreVertical,
  StarOff,
} from "lucide-react";

const LessonsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const {
    refetch,
    data: lessons = [],
    isLoading,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allLessons`);
      return res.data;
    },
  });

  const handleDeletePost = async (id) => {
    setOpenMenuId(null);
    Swal.fire({
      title: "Delete this lesson?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/lessons/${id}`);
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "The lesson has been removed.",
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({ title: "Error", text: error.message, icon: "error" });
        }
      }
    });
  };

  const MakeFeatured = async (id, isFeatured) => {
    setOpenMenuId(null);
    try {
      const result = await Swal.fire({
        title: isFeatured ? "Remove featured status?" : "Feature this lesson?",
        text: isFeatured
          ? "It will no longer be highlighted."
          : "It will be highlighted for all users.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#f59e0b",
        cancelButtonColor: "#6b7280",
        confirmButtonText: isFeatured ? "Yes, remove it" : "Yes, feature it",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/featured-lesson`, {
          lessonId: id,
        });
        Swal.fire({
          title: "Featured!",
          text: res.data.message,
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="min-h-screen p-6 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow">
          <BookOpen size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Lessons Management
          </h1>
          <p className="text-sm opacity-50">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <span className="text-sm">Loading lessons…</span>
          </div>
        ) : lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <BookOpen size={40} className="mb-3" />
            <p className="font-medium">No lessons found</p>
            <p className="text-sm mt-1">
              Lessons will appear here once created.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-black/5 text-xs uppercase tracking-wider opacity-50">
                  <th className="px-5 py-3 text-left w-10">#</th>
                  <th className="px-5 py-3 text-left">Lesson</th>
                  <th className="px-5 py-3 text-left">Creator</th>
                  <th className="px-5 py-3 text-left">Category</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {lessons.map((lesson, idx) => (
                  <tr
                    key={lesson._id}
                    className="hover:bg-indigo-50/40 transition-colors group"
                  >
                    <td className="px-5 py-4 opacity-30 font-mono text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </td>

                    {/* Title with ellipsis */}
                    <td className="px-5 py-4 max-w-[220px]">
                      <span
                        className="block truncate font-medium group-hover:text-indigo-700 transition-colors"
                        title={lesson.title}
                      >
                        {lesson.title}
                      </span>
                    </td>

                    {/* Creator */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {lesson.creatorName?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="opacity-70 truncate max-w-[120px]">
                          {lesson.creatorName}
                        </span>
                      </div>
                    </td>

                    {/* Category badge */}
                    <td className="px-5 py-4 ">
                      <span
                        className={`badge bg-violet-400 px-3 py-0.5 text-xs font-semibold capitalize`}
                      >
                        {lesson.category}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Inline buttons (visible on md+) */}
                        <div className="hidden md:flex items-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/all-lessons/${lesson._id}`)
                            }
                            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium opacity-70 shadow-sm hover:border-indigo-300 hover:text-indigo-700 hover:opacity-100 transition-all"
                          >
                            <Eye size={13} /> View
                          </button>

                          {lesson.isFeatured ? (
                            <button
                              onClick={() => MakeFeatured(lesson._id, lesson.isFeatured)}
                              className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm hover:bg-amber-100 transition-all"
                            >
                              <StarOff size={13} /> Remove Feature
                            </button>
                          ) : (
                            <button
                              onClick={() => MakeFeatured(lesson._id, lesson.isFeatured)}
                              className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm hover:bg-amber-100 transition-all"
                            >
                              <Star size={13} /> Make Feature
                            </button>
                          )}

                          <button
                            onClick={() => handleDeletePost(lesson._id)}
                            className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm hover:bg-red-100 transition-all"
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>

                        {/* Dropdown (visible on small screens) */}
                        <div className="relative md:hidden">
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === lesson._id ? null : lesson._id,
                              )
                            }
                            className="rounded-lg border border-gray-200 p-1.5 opacity-60 hover:opacity-100 transition-all"
                          >
                            <MoreVertical size={15} />
                          </button>
                          {openMenuId === lesson._id && (
                            <div className="absolute right-0 top-8 z-20 min-w-[140px] rounded-xl border border-gray-100 shadow-lg py-1 backdrop-blur-sm bg-white/80">
                              <button
                                onClick={() => {
                                  setOpenMenuId(null);
                                  navigate(`/all-lessons/${lesson._id}`);
                                }}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-indigo-50 hover:text-indigo-700"
                              >
                                <Eye size={14} /> View
                              </button>
                              <button
                                onClick={() => MakeFeatured(lesson._id, lesson.isFeatured)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-amber-700 hover:bg-amber-50"
                              >
                                {lesson.isFeatured ? (
                                  <span>
                                    <StarOff size={14} /> Remove Feature
                                  </span>
                                ) : (
                                  <span>
                                    <Star size={14} /> Make Feature
                                  </span>
                                )}
                              </button>
                              <button
                                onClick={() => handleDeletePost(lesson._id)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsManagement;
