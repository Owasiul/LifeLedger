import React from "react";
import { useNavigate } from "react-router";
import useUser from "../../../Hooks/useUser";
import {
  Type,
  AlignLeft,
  Image as ImageIcon,
  Lock,
  Sparkles,
  Save,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AddLesson = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userData } = useUser();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const handleSubmitPost = async (data) => {
    // Enforce premium restriction on backend side too
    const isPremiumUser = userData?.isPremium === true;
    const finalAccessLevel = isPremiumUser ? data.accessLevel : "free";

    const isFeatured = isPremiumUser && finalAccessLevel === "premium";

    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb}`;

      const imgbbResponse = await axios.post(image_API_URL, formData);
      const uploadedImageUrl = imgbbResponse.data.data.url;

      const lessonData = {
        title: data?.title,
        description: data?.description,
        category: data?.category,
        emotionalTone: data?.emotionalTone,
        image: uploadedImageUrl,
        visibility: data?.visibility,
        accessLevel: finalAccessLevel,
        creatorId: userData?._id,
        creatorName: user?.displayName,
        creatorEmail: userData?.email,
        creatorPhoto: user?.photoURL,
        likes: [],
        isFeatured,
      };

      const res = await axiosSecure.post("/lessons", lessonData);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      reset();
      Swal.fire({
        title: "Success!",
        text: "Your lesson has been added successfully!",
        icon: "success",
      });
      navigate("/dashboard/my-lessons");
      return res.data;
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to publish lesson. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <form onSubmit={handleSubmit(handleSubmitPost)} className="space-y-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-base-100 border-b border-base-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 px-1">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-base-content">
                Create New Lesson
              </h1>
              <p className="text-sm text-base-content/60">
                Capture your insights and share them with the community.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                onClick={() => navigate("/dashboard/my-lessons")}
              >
                <X size={16} /> Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-sm px-6 shadow-md shadow-primary/30 hover:shadow-primary/40"
              >
                <Save size={16} /> Publish Lesson
              </button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1">
          {/* LEFT — Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200">
              <div className="card-body p-8 space-y-8">
                <p className="text-xs text-base-content/50 font-medium">
                  Draft • Not published yet
                </p>

                {/* Title */}
                <div className="form-control flex flex-col gap-2">
                  <label className="label font-medium text-base-content/70 flex items-center gap-2">
                    <Type size={18} />
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    required
                    placeholder="The one thing I wish I knew at 20…"
                    className="input input-bordered w-full text-base-content dark:text-white text-2xl font-semibold tracking-tight px-4 py-3 border border-base-300 dark:border-base-700 placeholder:text-slate-700 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="form-control flex flex-col gap-2">
                  <label className="label font-medium text-base-content/70 flex items-center gap-2">
                    <AlignLeft size={18} />
                    Full Description & Insight
                  </label>
                  <textarea
                    {...register("description")}
                    required
                    placeholder="Tell the full story. What happened? What changed your perspective?"
                    className="textarea textarea-bordered w-full h-96 text-base-content dark:text-white text-lg leading-8 resize-y border border-base-300 dark:border-base-700 placeholder:text-slate-700 dark:placeholder:text-slate-400 px-4 py-3 focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Settings */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200">
              <div className="card-body p-6 space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-base-content/60 flex items-center gap-2">
                  <Sparkles size={18} className="text-warning" />
                  METADATA
                </h3>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content uppercase pb-1">
                    Category
                  </label>
                  <select
                    {...register("category")}
                    required
                    defaultValue=""
                    className="select select-bordered w-full px-4 py-3 text-base-content dark:text-white border border-base-300 dark:border-base-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900"
                  >
                    <option disabled value="" className="text-base-content dark:text-white dark:bg-base-800">
                      Select category
                    </option>
                    <option value="growth" className="text-base-content dark:text-white dark:bg-base-800">Personal Growth</option>
                    <option value="career" className="text-base-content dark:text-white dark:bg-base-800">Career</option>
                    <option value="relationships" className="text-base-content dark:text-white dark:bg-base-800">Relationships</option>
                    <option value="mindset" className="text-base-content dark:text-white dark:bg-base-800">Mindset</option>
                    <option value="mistakes" className="text-base-content dark:text-white dark:bg-base-800">Mistakes Learned</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content uppercase pb-1">
                    Emotional Tone
                  </label>
                  <select
                    {...register("emotionalTone")}
                    required
                    defaultValue=""
                    className="select select-bordered w-full px-4 py-3 text-base-content dark:text-white border border-base-300 dark:border-base-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900"
                  >
                    <option disabled value="" className="text-base-content dark:text-white dark:bg-base-800">
                      Select tone
                    </option>
                    <option value="motivational" className="text-base-content dark:text-white dark:bg-base-800">Motivational</option>
                    <option value="sad" className="text-base-content dark:text-white dark:bg-base-800">Sad / Reflective</option>
                    <option value="realization" className="text-base-content dark:text-white dark:bg-base-800">Sudden Realization</option>
                    <option value="gratitude" className="text-base-content dark:text-white dark:bg-base-800">Gratitude</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visibility & Access */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200">
              <div className="card-body p-6 space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-base-content/60 flex items-center gap-2">
                  <Lock size={18} className="text-info" />
                  VISIBILITY & ACCESS
                </h3>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content uppercase pb-1">
                    Privacy
                  </label>
                  <select
                    {...register("visibility")}
                    className="select select-bordered w-full px-4 py-3 text-base-content dark:text-white border border-base-300 dark:border-base-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900"
                  >
                    <option value="public" className="text-base-content dark:text-white dark:bg-base-800">Public (Everyone)</option>
                    <option value="private" className="text-base-content dark:text-white dark:bg-base-800">Private (Only Me)</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content uppercase pb-1">
                    Access Level
                  </label>

                  {!userData?.isPremium ? (
                    <div
                      className="tooltip tooltip-top w-full text-base-content"
                      data-tip="Upgrade to Premium to create premium lessons"
                    >
                      <select
                        {...register("accessLevel")}
                        defaultValue="free"
                        disabled
                        className="select select-bordered w-full px-4 py-3 bg-base-200 dark:bg-base-800 text-base-content/60 dark:text-white/50 cursor-not-allowed border border-base-300 dark:border-base-700"
                      >
                        <option value="free" className="text-base-content dark:text-white dark:bg-base-800">Free Lesson</option>
                        <option value="premium" className="text-base-content dark:text-white dark:bg-base-800">💎 Premium Lesson</option>
                      </select>
                    </div>
                  ) : (
                    <select
                      {...register("accessLevel")}
                      defaultValue="free"
                      className="select select-bordered w-full px-4 py-3 border border-base-300 dark:border-base-700 text-base-content dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-base-900"
                    >
                      <option value="free" className="text-base-content dark:text-white dark:bg-base-800">Free Lesson</option>
                      <option value="premium" className="text-base-content dark:text-white dark:bg-base-800">💎 Premium Lesson</option>
                    </select>
                  )}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all border border-base-200">
              <div className="card-body p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-base-content/60 flex items-center gap-2">
                  <ImageIcon size={18} />
                  COVER IMAGE
                </h3>

                <label
                  htmlFor="image-upload"
                  className="border-2 border-dashed border-base-300 hover:border-primary hover:bg-base-200/50 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center"
                >
                  <ImageIcon
                    size={40}
                    className="mx-auto mb-3 text-base-content/40"
                  />
                  <p className="font-medium text-base-content/70">
                    Click to upload cover image
                  </p>
                  <p className="text-xs text-base-content/50 mt-1">
                    PNG, JPG or WEBP (recommended 1200x630)
                  </p>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    {...register("image")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLesson;