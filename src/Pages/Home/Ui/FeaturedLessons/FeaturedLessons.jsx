import {
  Bookmark,
  Lock,
  LogIn,
  Share2,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Heart,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../../../Hooks/useUser";
import useAuth from "../../../../Hooks/useAuth";
import { Button, Card } from "@heroui/react";
import Swal from "sweetalert2";

const SkeletonCard = () => (
  <div className="group relative flex flex-col w-full overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl animate-pulse">
    {/* Skeleton Header */}
    <div className="flex items-center justify-between px-5 py-3 bg-gray-50/60 dark:bg-slate-800/50 rounded-t-2xl">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-4 w-14 bg-gray-200 dark:bg-slate-700 rounded-full" />
    </div>

    {/* Skeleton Image */}
    <div className="aspect-video bg-gray-200 dark:bg-slate-700" />

    {/* Skeleton Content */}
    <div className="p-5 pb-4 space-y-3">
      <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-md" />
    </div>

    {/* Skeleton Footer */}
    <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-4 w-12 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-8 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-200 dark:bg-slate-700 rounded" />
        <div className="h-4 w-4 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  </div>
);

const FeaturedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-lesson"],
    queryFn: async () => {
      const res = await axiosSecure.get("/featured-lesson");
      return res.data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Require auth before performing privileged actions
  const requireAuth = (message = "Please sign in to continue.") => {
    if (user?.email) return true;
    Swal.fire({
      icon: "info",
      title: "Sign in required",
      text: message,
      confirmButtonText: "Sign in",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auth/login", { state: { pathname: location.pathname } });
      }
    });
    return false;
  };

  // handleLike
  const handleLike = async (lessonID) => {
    if (!requireAuth("Please sign in to like this lesson.")) return;
    const res = await axiosSecure.post(`/lessons/${lessonID}/likes`, {
      user: user?.uid || user?.email,
    });
    queryClient.invalidateQueries({ queryKey: ["lessons"] });
    queryClient.invalidateQueries({ queryKey: ["featured-lesson"] });
    return res.data;
  };

  // Navigate to pricing only after auth check
  const handlePremiumUpgrade = () => {
    if (!requireAuth("Please sign in to upgrade to premium.")) return;
    navigate("/pricing");
  };

  const { userData } = useUser();
  const isPremiumUser = userData?.isPremium;

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            lessons.map((lesson) => {
              const isLocked = lesson.accessLevel !== "free" && !isPremiumUser;

              return (
                <Card
                  key={lesson._id}
                  className="group relative flex flex-col w-full overflow-hidden border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-xl rounded-2xl"
                >
                  {/* 🔒 Premium Overlay */}
                  {isLocked && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-900/65 dark:bg-slate-950/80 backdrop-blur-md text-white px-8 text-center rounded-2xl">
                      <div className="p-3 bg-purple-500/20 rounded-2xl mb-4 border border-purple-400/30">
                        <Lock className="text-purple-400" size={28} />
                      </div>
                      <h3 className="text-lg font-bold mb-1">Premium Lesson</h3>
                      <p className="text-sm text-slate-300 dark:text-slate-400 mb-6">
                        Upgrade to unlock.
                      </p>
                      <button
                        type="button"
                        onClick={handlePremiumUpgrade}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-sm font-bold shadow-lg transition-colors"
                      >
                        <Zap size={16} fill="currentColor" />
                        Upgrade
                      </button>
                    </div>
                  )}

                  {/* Card Header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-gray-50/60 dark:bg-slate-800/50 rounded-t-2xl">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={lesson.creatorPhoto}
                        alt={lesson.creatorName}
                        className="w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-700 object-cover"
                      />
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        {lesson.creatorName}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-[10px] rounded-full font-bold text-white ${
                        lesson.accessLevel === "free"
                          ? "bg-emerald-500"
                          : "bg-amber-500 dark:bg-orange-600"
                      }`}
                    >
                      {lesson.accessLevel}
                    </span>
                  </div>

                  {/* Card Body — blur scoped here only */}
                  <div className="p-0 flex-1">
                    <div
                      className={`relative h-full ${
                        isLocked
                          ? "blur-[2px] pointer-events-none select-none"
                          : ""
                      }`}
                    >
                      {/* Hover Read overlay */}
                      {!isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/25 backdrop-blur-[2px] z-10">
                          <Link
                            to={`/all-lessons/${lesson._id}`}
                            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold shadow-xl"
                          >
                            Read Post <LogIn size={15} />
                          </Link>
                        </div>
                      )}

                      {/* Thumbnail */}
                      <div className="overflow-hidden aspect-video">
                        <img
                          src={lesson.image}
                          alt={lesson.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Title & Tone tag */}
                      <div className="p-5 pb-4">
                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-50 leading-snug mb-3 line-clamp-2">
                          {lesson.title}
                        </h2>
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                          {lesson.emotionalTone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer — always sharp, never blurred */}
                  <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between rounded-b-2xl">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Button
                        variant="light"
                        size="sm"
                        isIconOnly={false}
                        onPress={() => handleLike(lesson._id)}
                        startContent={<Heart size={15} />}
                        className="min-w-0 px-2 gap-2 text-slate-500 hover:text-rose-500 dark:text-slate-400"
                      >
                        <ThumbsUp/>
                        <span className="text-xs font-bold">
                          {lesson.likes.length}
                        </span>
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        isIconOnly
                        className="min-w-0 text-slate-500 hover:text-rose-500 dark:text-slate-400"
                      >
                        <ThumbsDown size={15} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Button
                        variant="light"
                        size="sm"
                        isIconOnly
                        className="min-w-0 hover:text-amber-500"
                      >
                        <Bookmark size={15} />
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        isIconOnly
                        className="min-w-0 hover:text-indigo-500"
                      >
                        <Share2 size={15} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
