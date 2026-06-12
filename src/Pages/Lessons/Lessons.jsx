import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../Hooks/useUser";
import { Link } from "react-router";
import {
  Bookmark,
  Lock,
  LogIn,
  Search,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { Button, Input } from "@heroui/react";

const SkeletonLessonCard = () => (
  <div className="group relative flex flex-col w-full max-w-100 mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-pulse">
    {/* Skeleton Header */}
    <div className="flex items-center justify-between px-5 py-4 bg-gray-50/50 dark:bg-slate-800/40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700" />
        <div className="h-3 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
    </div>

    {/* Skeleton Image */}
    <div className="aspect-video bg-gray-200 dark:bg-slate-700" />

    {/* Skeleton Content */}
    <div className="p-5 space-y-3">
      <div className="h-5 w-full bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-5 w-2/3 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-md" />
    </div>

    {/* Skeleton Footer */}
    <div className="mt-auto px-5 py-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
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

const Lessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { userData, isLoading: isUserLoading } = useUser();
  const isPremiumUser = userData?.isPremium;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sort
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  // Search
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input and reset to page 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Fetch lessons
  const { isLoading, data } = useQuery({
    queryKey: ["lessons", currentPage, sort, order, debouncedSearch],
    queryFn: async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const params = new URLSearchParams();
      params.set("limit", itemsPerPage);
      params.set("skip", skip);
      if (sort) params.set("sort", sort);
      if (order) params.set("order", order);
      if (debouncedSearch) params.set("search", debouncedSearch);
      const res = await axiosSecure.get(`/all-lessons?${params.toString()}`);
      return res.data;
    },
  });
  const lessons = data?.all_lessons || [];
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  // Handle like – invalidate query so the like count updates
  const handleLike = async (lessonID) => {
    try {
      await axiosSecure.post(`/lessons/${lessonID}/likes`, {
        user: user._id,
      });
      // Refetch lessons to show updated counts
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  // Sort handler
  const handleSort = (e) => {
    const [newSort, newOrder] = e.target.value.split("-");
    setSort(newSort);
    setOrder(newOrder);
    // Reset to page 1 when sort changes
    setCurrentPage(1);
  };

  // While user data is loading, show a loader to avoid flash of wrong premium state
  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      {/* top */}
      <div className="flex flex-row items-center justify-between mx-6 my-5 gap-5">
        {/* total-lessons */}
        <div className="total-lessons">
          <p className="lg:text-3xl text-lg font-bold underline">
            Total Lessons : {data?.total}{" "}
          </p>
        </div>
        {/* search */}
        <div className="search">
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            startcontent={<Search className="text-default-400" />}
            classnames={{
              base: "max-w-75 lg:w-75 w-44",
              input: "placeholder:text-default-400",
            }}
          />
        </div>
        {/* select */}
        <select className="select" onChange={handleSort} defaultValue="">
          <option value="" disabled>
            Sort by
          </option>
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="likesCount-desc">Most Liked</option>
          <option value="accessLevel-asc">Free First</option>
          <option value="accessLevel-desc">Premium First</option>
        </select>
      </div>

      {/* middle */}
      {isLoading ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto my-10">
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
          <SkeletonLessonCard />
        </div>
      ) : lessons.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No lessons found.
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto my-10">
          {lessons.map((lesson) => {
            // isLocked is safely computed now that userData has loaded
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

                  {/* Footer */}
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
                      <Bookmark
                        size={18}
                        className="hover:text-amber-500 cursor-pointer"
                      />
                      <Share2
                        size={18}
                        className="hover:text-indigo-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* bottom – pagination */}
      <div className="flex gap-2 my-6 mx-2 justify-end">
        <Button
          variant="flat"
          color="default"
          isDisabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>

        {[...Array(totalPages).keys()].map((page) => (
          <Button
            key={page}
            variant={currentPage === page + 1 ? "solid" : "flat"}
            color={currentPage === page + 1 ? "primary" : "default"}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Button>
        ))}

        <Button
          variant="flat"
          color="default"
          isDisabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Lessons;
