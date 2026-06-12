import { useQuery } from "@tanstack/react-query";
import React from "react";
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
  EllipsisVertical,
} from "lucide-react";
import Loading from "../../../Components/Loading/Loading";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Button } from "@heroui/react";

const LessonsManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  const MakeFeatured = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Feature this lesson?",
        text: "It will be highlighted for all users.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#f59e0b",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, feature it",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/featured-lesson`, {
          lessonId: id,
          // isFeatured not needed — backend always sets to true
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
    <div className="min-h-screen p-4 sm:p-6 font-sans">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl shadow shrink-0">
          <BookOpen size={20} />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-primary">
            Lessons Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white shadow-sm bg-gray-800 overflow-hidden">
        {isLoading ? (
          <Loading />
        ) : lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
            <BookOpen size={40} className="mb-3 text-indigo-400" />
            <p className="font-medium">No lessons found</p>
            <p className="text-sm mt-1">
              Lessons will appear here once created.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider text-accent">
                  <th className="px-4 sm:px-5 py-3 text-left w-10">#</th>
                  <th className="px-4 sm:px-5 py-3 text-left">Lesson</th>
                  <th className="px-4 sm:px-5 py-3 text-left hidden sm:table-cell">
                    Creator
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-left hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-4 sm:px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {lessons.map((lesson, idx) => (
                  <tr
                    key={lesson._id}
                    className="hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                  >
                    {/* Index */}
                    <td className="px-4 sm:px-5 py-4 text-gray-400 dark:text-gray-500 font-mono text-xs">
                      {String(idx + 1).padStart(2, "0")}
                    </td>

                    {/* Title + mobile meta */}
                    <td className="px-4 sm:px-5 py-4">
                      <span
                        className="block truncate font-medium max-w-40 sm:max-w-55 dark:text-white"
                        title={lesson.title}
                      >
                        {lesson.title}
                      </span>
                      {/* Creator shown on mobile below title */}
                      <div className="flex items-center gap-1.5 mt-1 sm:hidden">
                        <div className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {lesson.creatorName?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-30">
                          {lesson.creatorName}
                        </span>
                      </div>
                      {/* Category shown on mobile below title */}
                      <div className="mt-1 md:hidden">
                        <span className="inline-block rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 text-xs font-semibold capitalize">
                          {lesson.category}
                        </span>
                      </div>
                    </td>

                    {/* Creator (hidden on mobile) */}
                    <td className="px-4 sm:px-5 py-4 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {lesson.creatorName?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 truncate max-w-30">
                          {lesson.creatorName}
                        </span>
                      </div>
                    </td>

                    {/* Category (hidden on mobile) */}
                    <td className="px-4 sm:px-5 py-4 hidden md:table-cell">
                      <span className="inline-block rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-3 py-0.5 text-xs font-semibold capitalize">
                        {lesson.category}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 sm:px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Desktop buttons */}
                        <div className="hidden md:flex items-center gap-2">
                          <Button
                            onClick={() =>
                              navigate(`/all-lessons/${lesson._id}`)
                            }
                            variant="flat"
                            color="default"
                            size="sm"
                          >
                            <Eye size={13} /> View
                          </Button>

                          <Button
                            onClick={() =>
                              MakeFeatured(lesson._id, lesson.isFeatured)
                            }
                            variant="flat"
                            color="warning"
                            size="sm"
                          >
                            {lesson.isFeatured ? (
                              <>
                                <StarOff size={13} /> Remove Feature
                              </>
                            ) : (
                              <>
                                <Star size={13} /> Make Feature
                              </>
                            )}
                          </Button>

                          <Button
                            onClick={() => handleDeletePost(lesson._id)}
                            color="danger"
                            size="sm"
                          >
                            <Trash2 size={13} /> Delete
                          </Button>
                        </div>

                        {/* Mobile dropdown menu */}
                        <div className="md:hidden">
                          <Menu as="div" className="relative">
                            <MenuButton className="flex items-center justify-center rounded-md p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                              <EllipsisVertical size={18} />
                            </MenuButton>

                            <MenuItems
                              anchor="bottom end"
                              className="z-50 w-48 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg focus:outline-none overflow-hidden"
                            >
                              <MenuItem>
                                <Button
                                  onClick={() =>
                                    navigate(`/all-lessons/${lesson._id}`)
                                  }
                                  variant="flat"
                                  color="default"
                                  size="sm"
                                  className="w-full justify-start"
                                >
                                  <Eye size={14} /> View
                                </Button>
                              </MenuItem>

                              <MenuItem>
                                <Button
                                  onClick={() =>
                                    MakeFeatured(lesson._id, lesson.isFeatured)
                                  }
                                  variant="flat"
                                  color="warning"
                                  size="sm"
                                  className="w-full justify-start"
                                >
                                  {lesson.isFeatured ? (
                                    <>
                                      <StarOff size={14} /> Remove Feature
                                    </>
                                  ) : (
                                    <>
                                      <Star size={14} /> Make Feature
                                    </>
                                  )}
                                </Button>
                              </MenuItem>

                              <MenuItem>
                                <Button
                                  onClick={() => handleDeletePost(lesson._id)}
                                  color="danger"
                                  size="sm"
                                  className="w-full justify-start"
                                >
                                  <Trash2 size={14} /> Delete
                                </Button>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
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
