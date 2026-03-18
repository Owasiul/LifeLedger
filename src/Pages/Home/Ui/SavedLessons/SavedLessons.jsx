import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, Eye } from "lucide-react";
import { Link } from "react-router";
import Loading from "../../../../Components/Loading/Loading";

const SavedLessons = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch most saved lessons this week from backend
  const { data: mostSavedLessons = [], isLoading } = useQuery({
    queryKey: ["mostSavedLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/top-lessons`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full min-h-screen py-10">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="my-10">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="p-3 rounded-lg">
              <Bookmark className="text-blue-600" size={30} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-accent">
                Most Saved This Week
              </h1>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {mostSavedLessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-4 rounded-2xl mb-4">
              <Bookmark className="text-primary" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Popular Lessons This Week
            </h3>
            <p className="text-center mb-6">
              Check back soon to see what lessons are trending in your community
            </p>
            <Link
              to="/all-lessons"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Explore Lessons
            </Link>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mostSavedLessons.map((lesson, index) => (
              <div
                key={lesson._id}
                className="card w-96 group relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700"
              >
                {/* Trending Rank Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-sm shadow-lg">
                  <span>#{index + 1}</span>
                </div>

                {/* Header with Creator Info & Badge */}
                <div className="flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={lesson.creatorPhoto}
                      alt={lesson.creatorName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-600"
                    />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">
                      {lesson.creatorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-bold whitespace-nowrap text-white ${
                        lesson.accessLevel === "free"
                          ? "bg-emerald-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </div>
                </div>

                {/* Image with Hover Overlay */}
                <div className="relative overflow-hidden aspect-video bg-slate-200 dark:bg-slate-700">
                  <img
                    src={lesson.image}
                    alt={lesson.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Read Post Button Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <Link
                      to={`/all-lessons/${lesson._id}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg flex items-center gap-2"
                    >
                      <Eye size={16} /> Read
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Category & Tone */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium">
                      {lesson.category}
                    </span>
                    <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                      {lesson.emotionalTone}
                    </span>
                  </div>
                </div>

                {/* Footer with Save Count */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-bold text-sm rounded-lg whitespace-nowrap">
                      🔥 {lesson.saveCount} saves
                    </span>
                  </div>
                  <Link
                    to={`/all-lessons/${lesson._id}`}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium text-sm rounded-lg transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedLessons;
