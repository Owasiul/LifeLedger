import { Bookmark, Lock, LogIn, Share2, Zap } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../../Hooks/useUser";
import useAuth from "../../../../Hooks/useAuth";

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });

  // handleLike
  const handleLike = async (lessonID) => {
    const res = await axiosSecure.post(`/lessons/${lessonID}/likes`, {
      user: user._id,
    });
    queryClient.invalidateQueries({ queryKey: ["lessons"] });
    return res.data;
  };

  const { userData } = useUser();
  const isPremiumUser = userData?.isPremium;


  return (
    <div className="w-[90%] mx-auto">
      <div className="my-10">
        <h2 className="lg:text-6xl text-3xl text-secondary font-semibold">
          Featured Wisdom
        </h2>
        <p className="lg:text-2xl text-xl text-primary mt-3">
          Curated lessons from our community's most insightful voices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => {
          const isLocked = lesson.accessLevel !== "free" && !isPremiumUser;

          return (
            <div
              key={lesson._id}
              className="card lg:w-96 full h-full mx-auto relative group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* 🔒 Premium Overlay (ONLY when locked) */}
              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white px-6 text-center">
                  <Lock className="text-purple-400 mb-3" size={22} />
                  <p className="text-sm leading-relaxed">
                    Premium content. Upgrade to unlock this lesson.
                  </p>
                  <Link
                    to="/pricing"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-sm font-medium"
                  >
                    <Zap size={14} />
                    Upgrade
                  </Link>
                </div>
              )}

              {/* Card Content Wrapper */}
              <div className={isLocked ? "blur-sm pointer-events-none" : ""}>
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={lesson.creatorPhoto}
                      alt={lesson.creatorName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {lesson.creatorName}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium text-white ${
                      lesson.accessLevel === "free"
                        ? "bg-emerald-600"
                        : isPremiumUser
                          ? "bg-purple-600"
                          : "bg-orange-500"
                    }`}
                  >
                    {lesson.accessLevel}
                  </span>
                </div>

                {/* Content Area (Thumbnail + Body) with hover overlay */}
                <div className="relative">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={lesson.image}
                      alt={lesson.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {lesson.title}
                    </h2>

                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-md text-white ${
                        lesson.emotionalTone === "Urgent"
                          ? "bg-orange-400"
                          : "bg-green-600"
                      }`}
                    >
                      {lesson.emotionalTone}
                    </span>
                  </div>

                  {/* ✅ Read button overlay - ONLY covers thumbnail + body */}
                  {!isLocked && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                      <Link
                        to={`/all-lessons/${lesson?._id}`}
                        className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                      >
                        Read Post <LogIn size={18} />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Footer - Outside the overlay area */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition">
                    <button
                      onClick={() => {
                        handleLike(lesson._id);
                      }}
                      className="upvote flex flex-row gap-3"
                    >
                      {/* upvote */}
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        {" "}
                        <path d="M9.456 4.216l-5.985 7.851a2.384 2.384 0 002.545 3.551l2.876-.864.578 4.042a2.384 2.384 0 004.72 0l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115z" />{" "}
                      </svg>
                      <span className="text-sm">{lesson.likes.length}</span>
                    </button>
                  </div>
                  {/* Downvote */}{" "}
                  <svg
                    className="w-5 h-5 rotate-180 hover:text-red-500 cursor-pointer transition"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    {" "}
                    <path d="M9.456 4.216l-5.985 7.851a2.384 2.384 0 002.545 3.551l2.876-.864.578 4.042a2.384 2.384 0 004.72 0l.576-4.042 2.877.864a2.384 2.384 0 002.625-3.668L14.63 4.33a3.268 3.268 0 00-5.174-.115z" />{" "}
                  </svg>
                  <div className="flex items-center gap-2 hover:text-yellow-500 cursor-pointer transition">
                    <Bookmark size={18} />
                    <span className="text-sm">{lesson.favoritesCount}</span>
                  </div>
                  <Share2
                    size={18}
                    className="hover:text-blue-500 cursor-pointer transition"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedLessons;
