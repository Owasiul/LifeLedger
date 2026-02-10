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

const AddLesson = () => {
  const { userData } = useUser();
  console.log(userData);
  return (
    <div>
      <form className="space-y-8">
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
                  <select name="privacy" className="select select-bordered">
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
                      userData?.isPremium !== "premium"
                        ? "tooltip tooltip-top w-full"
                        : "w-full"
                    }
                    data-tip={
                      userData?.isPremium !== "premium"
                        ? "Upgrade to Premium to create paid lessons"
                        : undefined
                    }
                  >
                    <select
                      name="access"
                      disabled={userData?.isPremium !== "premium"}
                      className={`
                  select select-bordered w-full
                  ${
                    userData?.isPremium !== "premium"
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
