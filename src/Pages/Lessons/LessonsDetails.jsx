import React, { useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import {
  Heart,
  Bookmark,
  Share2,
  Eye,
  Calendar,
  Clock,
  Globe,
  MessageSquare,
  Send,
  Flag,
} from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import ReactShare from "../../Components/ReactShare/ReactShare";
import Loading from "../../Components/Loading/Loading";

const LessonsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [savedLesson, setSavedLesson] = useState(null);
  const shareModalRef = useRef();

  // lessons details
  const { data: lessonsDetails } = useQuery({
    queryKey: ["lessonsdetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons/${id}`);
      return res.data;
    },
  });

  // getting the Comments Data
  const { data: commentsData = [] } = useQuery({
    queryKey: ["commentsData", lessonsDetails?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${lessonsDetails._id}`);
      // console.log(res.data);
      return res.data;
    },
    enabled: !!lessonsDetails?._id,
  });

  // filtered Data shown in suggetion
  const { data: filteredData = [] } = useQuery({
    queryKey: ["filterdData", lessonsDetails?.category],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/filtered-lessons?category=${lessonsDetails?.category}`,
      );
      return res.data;
    },
  });

  // format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // format reading time
  const calculateReadingTime = (text) => {
    if (!text) return "5 min read";
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // reports lessons
  const handleReportLesson = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, report it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post(`/reports/${id}`, {
          user: user,
        });

        Swal.fire({
          title: "Reported!",
          text: "The lesson has been reported successfully.",
          icon: "success",
        });

        return res.data;
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while reporting.",
        icon: "error",
      });
    }
  };

  // likes
  const handleLike = async (lessonID) => {
    const alreadyLiked = lessonsDetails.likes.includes(user._id);
    if (!alreadyLiked) {
      const res = await axiosSecure.post(`/lessons/${lessonID}/likes`, {
        user: user._id,
      });
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      return res.data;
    }
  };

  // comments
  const handleComment = async (data, lessonID) => {
    try {
      const res = await axiosSecure.post(`/comments/${lessonID}`, {
        comment: data.comment.trim(),
        user: {
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        },
      });

      // Invalidate queries to refresh comments
      queryClient.invalidateQueries({
        queryKey: ["commentsData", lessonsDetails._id],
      });

      reset();

      Swal.fire({
        icon: "success",
        title: "Comment Added",
        text: "Your comment has been posted successfully.",
        timer: 1500,
      });

      return res.data;
    } catch (error) {
      console.error("Comment error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to post comment. Please try again.",
      });
    }
  };

  // saved lesson
  const handleSaveLesson = async (lessonID) => {
    try {
      const res = await axiosSecure.post(`/lessons/${lessonID}/saved-lessons`, {
        lessonTitle: lessonsDetails?.title,
        user: {
          email: user?.email,
        },
      });
      setSavedLesson(res.data);
      Swal.fire({
        icon: "success",
        title: "Lesson Saved",
        text: "This lesson has been saved successfully.",
        timer: 1500,
      });
      return res.data;
    } catch (error) {
      console.error("Comment error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Failed to save the lesson. Please try again.",
      });
    }
  };

  // share btn
  const shareModal = () => {
    shareModalRef.current.showModal();
  };

  if (!lessonsDetails) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar></Navbar>
      <main>
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Header Section */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs sm:text-sm font-medium">
                  Category: {lessonsDetails.category}
                </span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs sm:text-sm font-medium">
                  Tone: {lessonsDetails.emotionalTone}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
                {lessonsDetails.title}
              </h1>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                {/* Featured Image */}
                <div className="relative rounded-xl overflow-hidden bg-slate-800 shadow-2xl">
                  {lessonsDetails.image ? (
                    <img
                      src={lessonsDetails.image}
                      alt={lessonsDetails.title}
                      className="w-full h-auto object-cover max-h-75 sm:max-h-100 md:max-h-125"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-72 md:h-96 bg-linear-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-blue-600/30 rounded-2xl flex items-center justify-center">
                          <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base">
                          No preview image available
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 pb-5 sm:pb-6 border-b border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Created: {formatDate(lessonsDetails.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Updated: {formatDate(lessonsDetails.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>Visibility: {lessonsDetails.visibility}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>
                      Reading Time:{" "}
                      {calculateReadingTime(lessonsDetails.description)}
                    </span>
                  </div>
                  {lessonsDetails.accessLevel && (
                    <div className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded-full text-xs font-medium">
                      {lessonsDetails.accessLevel}
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="prose prose-invert prose-base sm:prose-lg max-w-none">
                  <div className="text-slate-300 leading-relaxed space-y-4">
                    <p className="text-base sm:text-lg">
                      {lessonsDetails.description}
                    </p>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 py-4 sm:py-6 border-y border-slate-700">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {lessonsDetails.likes.length} Likes
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {lessonsDetails.favoritesCount} Favorites
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {lessonsDetails.viewsCount || 0} Views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                  <div>
                    {savedLesson?.saved ? (
                      <span className="text-green-500 text-sm sm:text-base">
                        Lesson Saved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSaveLesson(lessonsDetails?._id)}
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                      >
                        <Bookmark className="w-4 h-4 shrink-0" />
                        <span>Save to Favorites</span>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleLike(lessonsDetails._id)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Heart className="w-4 h-4 shrink-0" />
                    <span>Like</span>
                  </button>
                  <button
                    onClick={() => handleReportLesson(lessonsDetails._id)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Flag className="w-4 h-4 shrink-0" />
                    <span>Report</span>
                  </button>
                  <button
                    onClick={() => shareModal()}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments Section */}
                <div className="mt-6 sm:mt-8 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Comments
                  </h3>

                  {/* Comment Input */}
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0">
                      <img
                        className="w-full h-full rounded-full object-cover"
                        src={user.photoURL}
                        alt=""
                      />
                    </div>
                    <form
                      onSubmit={handleSubmit((data) =>
                        handleComment(data, lessonsDetails._id),
                      )}
                      className="flex-1 flex md:gap-2 gap-1"
                    >
                      <input
                        type="text"
                        {...register("comment")}
                        placeholder="Add a comment..."
                        className="flex-1 min-w-0 px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm sm:text-base placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="submit"
                        className="px-2 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-3 sm:space-y-4">
                    {commentsData.map((c) => (
                      <div
                        key={c._id}
                        className="flex items-start gap-2 sm:gap-3 p-2"
                      >
                        <img
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                          src={c.userPhotoURL}
                          alt=""
                        />
                        <div className="bg-gray-100 rounded-lg px-3 sm:px-4 py-2 flex-1 min-w-0 space-y-1">
                          <p className="text-black text-sm sm:text-base font-semibold truncate">
                            {c.commentedby}
                          </p>
                          <p className="text-black font-medium text-xs sm:text-sm wrap-break-words">
                            {c.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                    {commentsData.length === 0 && (
                      <p className="text-slate-500 text-sm">
                        No comments yet. Be the first!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Author & Similar */}
              <div className="space-y-5 sm:space-y-6">
                {/* Author Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700">
                  <div className="flex flex-col items-center text-center">
                    {lessonsDetails.creatorPhoto ? (
                      <img
                        src={lessonsDetails.creatorPhoto}
                        alt={lessonsDetails.creatorName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-3 sm:mb-4 object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 mb-3 sm:mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                        {lessonsDetails.creatorName?.charAt(0) || "U"}
                      </div>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {lessonsDetails.creatorName}
                    </h3>
                  </div>
                </div>

                {/* Similar Lessons */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Similar and Recommended Lessons
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {filteredData.map((sameData) => (
                      <div
                        key={sameData?._id}
                        className="bg-slate-700/50 rounded-lg p-3 hover:bg-slate-700 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div className="w-14 h-16 sm:w-16 sm:h-20 shrink-0">
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              src={sameData.image}
                              alt=""
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-xs sm:text-sm mb-1 line-clamp-2">
                              {sameData.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                              <span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-400 rounded">
                                {sameData.category}
                              </span>
                              <span className="px-1.5 py-0.5 bg-purple-600/20 text-purple-400 rounded">
                                {sameData.emotionalTone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Badge */}
                {lessonsDetails.isFeatured && (
                  <div className="bg-linear-to-br from-amber-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl p-4 border border-amber-600/30">
                    <div className="flex items-center gap-2 text-amber-400">
                      <span className="text-xl sm:text-2xl">⭐</span>
                      <span className="font-semibold text-sm sm:text-base">
                        Featured Lesson
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <dialog
          ref={shareModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <ReactShare />
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LessonsDetails;
