import { Bookmark, Lock, LogIn, Share2, Zap, ThumbsUp, ThumbsDown } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../../Hooks/useUser";
import useAuth from "../../../../Hooks/useAuth";
import { Button } from "@heroui/react";

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
    staleTime: 30000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  console.log(lessons);

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
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-semibold mb-2">
            Community Picks
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
            Featured Wisdom
          </h2>
          <p className="text-base text-base-content/70 mt-3 max-w-2xl">
            Curated lessons from our community's most insightful voices.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto my-10">
          {lessons.map((lesson) => {
            const isLocked = lesson.accessLevel !== "free" && !isPremiumUser;
            return (
              <div
                key={lesson._id}
                className="group relative flex flex-col w-full max-w-100 mx-auto 
                    /* Light Mode */ bg-white border-gray-100 shadow-sm 
                    /* Dark Mode */ dark:bg-slate-900 dark:border-slate-800 dark:shadow-2xl 
                    rounded-3xl border transition-all duration-500 overflow-hidden hover:shadow-xl"
              >
                {/* 🔒 Premium Overlay */}
                {isLocked && (
                  <div
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center 
                        bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md text-white px-8 text-center animate-in fade-in"
                  >
                    <div className="p-3 bg-purple-500/20 rounded-2xl mb-4 border border-purple-400/30">
                      <Lock className="text-purple-400" size={28} />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Premium Lesson</h3>
                    <p className="text-sm text-slate-200 dark:text-slate-400 mb-6">
                      Upgrade to unlock.
                    </p>
                    <Link
                      to="/pricing"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-sm font-bold shadow-lg"
                    >
                      <Zap size={16} fill="currentColor" /> Upgrade
                    </Link>
                  </div>
                )}

                {/* Card Body */}
                <div
                  className={`flex flex-col h-full ${isLocked ? "blur-[2px] pointer-events-none" : ""}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50/50 dark:bg-slate-800/40">
                    <div className="flex items-center gap-3">
                      <img
                        src={lesson.creatorPhoto}
                        className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-700"
                        alt=""
                      />
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                        {lesson.creatorName}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 text-[10px] rounded-full font-bold text-white ${
                        lesson.accessLevel === "free"
                          ? "bg-emerald-500"
                          : "bg-amber-500 dark:bg-orange-600"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </div>

                  {/* Wrapper for Image & Title with Read button overlay */}
                  <div className="relative">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={lesson.image}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt=""
                      />
                    </div>

                    {/* Title section */}
                    <div className="p-5">
                      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-50 leading-tight mb-3">
                        {lesson.title}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {lesson.emotionalTone}
                      </span>
                    </div>

                    {/* Read button overlay - covers image and title area only */}
                    {!isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20 backdrop-blur-[2px] z-10">
                        <Link
                          to={`/all-lessons/${lesson?._id}`}
                          className="px-5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-xl flex items-center gap-2"
                        >
                          Read Post <LogIn size={16} />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Footer - outside the overlay wrapper */}
                  <div className="mt-auto px-5 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                      <Button
                        onClick={() => handleLike(lesson?._id)}
                        variant="ghost"
                        color="default"
                        className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
                      >
                        <ThumbsUp size={18} />{" "}
                        <span className="text-xs font-bold">
                          {lesson.likes.length}
                        </span>
                      </Button>
                      <Button
                        variant="ghost"
                        color="default"
                        className="hover:text-rose-500 transition-colors"
                      >
                        <ThumbsDown size={18} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <div className="">
                        <Bookmark
                          size={18}
                          className="hover:text-amber-500 cursor-pointer"
                        />
                      </div>
                      <div className="">
                        <Share2
                          size={18}
                          className="hover:text-indigo-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
