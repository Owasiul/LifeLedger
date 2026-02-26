import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useUser from "../../Hooks/useUser";
import { Link } from "react-router";
import {
  Bookmark,
  Lock,
  LogIn,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const Lessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { userData } = useUser();
  const isPremiumUser = userData?.isPremium;
  // implement pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // implement sort
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");

  // implement search
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  console.log(searchText);

  // handle dely
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1);
    return () => clearTimeout(timer);
  }, [searchText]);

  // all lessons data with sort and search
  const { data } = useQuery({
    queryKey: ["lessons", currentPage, sort, order, debouncedSearch],
    queryFn: async () => {
      const skip = (currentPage - 1) * itemsPerPage;
      const res = await axiosSecure.get(
        `/all-lessons?limit=${itemsPerPage}&skip=${skip}&sort=${sort}&order=${order}&search=${debouncedSearch}`,
      );
      return res.data;
    },
  });
  const lessons = data?.all_lessons || [];
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;

  // all lessons data
  const { data: allLessons = [] } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons`);
      return res.data;
    },
  });

  // handleLike
  const handleLike = async (lessonID) => {
    const res = await axiosSecure.post(`/lessons/${lessonID}/likes`, {
      user: user._id,
    });
    return res.data;
  };
  // handle sorting
  const handleSort = (e) => {
    const [sort, order] = e.target.value.split("-");
    setSort(sort);
    setOrder(order);
  };

  return (
    <div className="">
      {/* top */}
      <div className="flex flex-row items-center justify-between mx-6 my-5">
        {/* total-lessons */}
        <div className="total-lessons">
          <p className="text-3xl font-bold underline">
            Total Lessons : {allLessons.total}{" "}
          </p>
        </div>
        {/* search */}
        <div className="search">
          <label className="input max-w-75 w-75 input-accent">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type="search"
              required
              placeholder="Search"
            />
          </label>
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
                    <button
                      onClick={() => handleLike(lesson?._id)}
                      className="flex items-center gap-1 hover:text-emerald-500 transition-colors"
                    >
                      <ThumbsUp size={18} />{" "}
                      <span className="text-xs font-bold">
                        {lesson.likes.length}
                      </span>
                    </button>
                    <button className="hover:text-rose-500 transition-colors">
                      <ThumbsDown size={18} />
                    </button>
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
      {/* bottom */}
      <div className="flex gap-2 my-6 mx-2 justify-end">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`btn ${currentPage === page + 1 ? "btn-primary" : ""}`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}

        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Lessons;
