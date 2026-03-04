import { useForm } from "react-hook-form";
import useUser from "../../../Hooks/useUser";
import { Type, AlignLeft, Lock, Sparkles, Save, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UpdateLesson = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { userData } = useUser();
  const { data: userLesson = [] } = useQuery({
    queryKey: ["userLesson"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${userData.email}`);
      return res.data[0];
    },
  });
  //   console.log(userLesson);
  useEffect(() => {
    if (userLesson && userLesson.title) {
      reset({
        title: userLesson.title,
        visibility: userLesson.visibility,
        accessLevel: userLesson.accessLevel,
        description: userLesson.description,
      });
    }
  }, [userLesson, reset]);

  const handleUpdateLesson = async (data) => {
    console.log(data);
    await axiosSecure.patch(`/update-lessons/${userLesson._id}`, data);
    Swal.fire({
      title: "Your Lesson has been updateed successfully!",
      icon: "success",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateLesson)} className="space-y-8">
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-base-100/80 backdrop-blur border-b border-base-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-base-content">
                Update Your Lesson
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
                <Save size={16} /> Update Lesson
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
                {/* Title */}
                <div className="form-control flex flex-col gap-5">
                  <label className="label font-medium text-base-content/70">
                    <Type size={16} /> Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    {...register("title")}
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
                    placeholder="Tell the full story. What happened? What changed your perspective?"
                    className="
                textarea textarea-bordered
                w-full
                h-96
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
