import React from "react";
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
import axios from "axios";

const AddLesson = () => {
  const { userData } = useUser();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const handleSubmitPost = async (data) => {
    const isFeatured = userData.isPremium === true ? true : false;
    try {
      // Create FormData and upload image to imgbb
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imgbb
      }`;

      // ✔️ Await the imgbb upload
      const imgbbResponse = await axios.post(image_API_URL, formData);

      const uploadedImageUrl = imgbbResponse.data.data.url;

      const lessonData = {
        title: data.title,
        description: data.description,
        category: data.category,
        emotionalTone: data.emotionalTone,
        image: uploadedImageUrl,
        visibility: data.visibility,
        accessLevel: data.accessLevel,
        creatorId: userData._id,
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        likes: [],
        isFeatured,
      };
      const res = await axiosSecure.post("/lessons", lessonData);
      console.log(lessonData, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleSubmitPost)} className="space-y-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-base-100/80 backdrop-blur border-b border-base-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5">
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
              >
                <X size={16} /> Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-sm px-6 shadow-md shadow-primary/30"
              >
                <Save size={16} /> Publish Lesson
              </button>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — Writing Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-8 space-y-8">
                {/* Draft Hint */}
                <p className="text-xs text-base-content/40">
                  Draft • Not published yet
                </p>

                {/* Title */}
                <div className="form-control flex flex-col gap-5">
                  <label className="label font-medium text-base-content/70">
                    <Type size={16} /> Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title")}
                    required
                    placeholder="The one thing I wish I knew at 20…"
                    className="
                input input-bordered w-full
                text-2xl font-semibold tracking-tight
                focus:input-primary
              "
                  />
                </div>

                {/* Description */}
                <div className="form-control flex flex-col gap-5">
                  <label className="label font-medium text-base-content/70">
                    <AlignLeft size={16} /> Full Description & Insight
                  </label>
                  <textarea
                    name="description"
                    {...register("description")}
                    required
                    placeholder="Tell the full story. What happened? What changed your perspective?"
                    className="
                textarea textarea-bordered
                w-full
                text-lg leading-8
                resize-none
                focus:textarea-primary
              "
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Settings */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 flex items-center gap-2">
                  <Sparkles size={16} className="text-warning" />
                  Metadata
                </h3>

                <div className="form-control flex lg:flex-row flex-col gap-5 ">
                  <label className="label text-xs font-semibold text-base-content/50 uppercase">
                    Category
                  </label>
                  <select
                    name="category"
                    {...register("category")}
                    required
                    className="select select-bordered focus:select-primary"
                  >
                    <option disabled value="">
                      Select category
                    </option>
                    <option value="growth">Personal Growth</option>
                    <option value="career">Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistakes">Mistakes Learned</option>
                  </select>
                </div>

                <div className="form-control flex lg:flex-row flex-col gap-5">
                  <label className="label text-xs font-semibold text-base-content/50 uppercase">
                    Emotional Tone
                  </label>
                  <select
                    name="tone"
                    {...register("emotionalTone")}
                    required
                    className="select select-bordered focus:select-primary"
                  >
                    <option disabled value="">
                      Select tone
                    </option>
                    <option value="motivational">Motivational</option>
                    <option value="sad">Sad / Reflective</option>
                    <option value="realization">Sudden Realization</option>
                    <option value="gratitude">Gratitude</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Visibility & Access */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 flex items-center gap-2">
                  <Lock size={16} className="text-info" />
                  Visibility & Access
                </h3>

                <div className="form-control flex lg:flex-row flex-col gap-5">
                  <label className="label text-xs font-semibold text-base-content/50 uppercase">
                    Privacy
                  </label>
                  <select
                    name="privacy"
                    {...register("visibility")}
                    className="select select-bordered"
                  >
                    <option value="public">Public (Everyone)</option>
                    <option value="private">Private (Only Me)</option>
                  </select>
                </div>

                <div className="form-control flex lg:flex-row flex-col gap-5">
                  <label className="label text-xs font-semibold text-base-content/50 uppercase">
                    Access Level
                  </label>

                  <div
                    className={
                      userData?.isPremium === false
                        ? "tooltip tooltip-top w-full"
                        : "w-full"
                    }
                    data-tip={
                      userData?.isPremium === false
                        ? "Upgrade to Premium to create paid lessons"
                        : undefined
                    }
                  >
                    <select
                      name="access"
                      {...register("accessLevel")}
                      disabled={userData?.isPremium === false}
                      className={`
      select select-bordered w-full
      ${
        userData?.isPremium === false
          ? "bg-base-200 text-base-content/40 cursor-not-allowed"
          : "select-primary border-primary"
      }
    `}
                    >
                      <option value="free">Free Lesson</option>
                      <option value="premium">💎 Premium Lesson</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Cover Image
                </h3>

                <label
                  htmlFor="image-upload"
                  className="
              border-2 border-dashed border-base-300
              rounded-xl p-6 text-center cursor-pointer
              hover:border-primary hover:bg-primary/5
              transition-all
            "
                >
                  <ImageIcon
                    size={28}
                    className="mx-auto mb-2 text-base-content/30"
                  />
                  <p className="text-xs font-medium text-base-content/60">
                    Click to upload or drag & drop
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
