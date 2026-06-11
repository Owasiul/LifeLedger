import { useForm } from "react-hook-form";
import useUser from "../../../Hooks/useUser";
import { Type, AlignLeft, Lock, Save, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Button, Card } from "@heroui/react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const UpdateLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { userData } = useUser();

  const { data: userLesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (userLesson?.title) {
      reset({
        title: userLesson.title,
        visibility: userLesson.visibility,
        accessLevel: userLesson.accessLevel,
        description: userLesson.description,
      });
    }
  }, [userLesson, reset]);

  const handleUpdateLesson = async (data) => {
    try {
      await axiosSecure.patch(`/update-lessons/${id}`, data);
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
      Swal.fire({
        title: "Updated!",
        text: "Your lesson has been updated successfully.",
        icon: "success",
      });
      navigate("/dashboard/my-lessons");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update lesson",
        icon: "error",
      });
    }
  };

  if (isLoading) return <Loading />;

  if (!userLesson) {
    return (
      <div className="text-center py-16 text-base-content/60">
        <p className="text-lg font-medium">Lesson not found</p>
        <Button
          className="mt-4"
          color="primary"
          onClick={() => navigate("/dashboard/my-lessons")}
        >
          Back to My Lessons
        </Button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateLesson)} className="space-y-8">
        <div className="sticky top-0 z-20 bg-base-100/80 backdrop-blur border-b border-base-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-base-content">
                Update Your Lesson
              </h1>
              <p className="text-sm text-base-content/60">
                Edit your lesson details and save changes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                color="danger"
                size="sm"
                onClick={() => navigate("/dashboard/my-lessons")}
              >
                <X size={16} /> Cancel
              </Button>

              <Button
                type="submit"
                color="primary"
                size="sm"
                className="px-6 shadow-md shadow-primary/30"
              >
                <Save size={16} /> Update Lesson
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <Card.Body className="p-8 space-y-8">
                <div className="form-control flex flex-col gap-5">
                  <label className="label font-medium text-base-content/70">
                    <Type size={16} /> Lesson Title
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    placeholder="The one thing I wish I knew at 20…"
                    className="input input-bordered w-full text-2xl font-semibold tracking-tight focus:input-primary"
                  />
                </div>

                <div className="form-control flex flex-col gap-5">
                  <label className="label font-medium text-base-content/70">
                    <AlignLeft size={16} /> Full Description & Insight
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="Tell the full story. What happened? What changed your perspective?"
                    className="textarea textarea-bordered w-full h-96 text-lg leading-8 resize-none focus:textarea-primary"
                  />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <Card.Body className="p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 flex items-center gap-2">
                  <Lock size={16} className="text-info" />
                  Visibility & Access
                </h3>

                <div className="form-control flex lg:flex-row flex-col gap-5">
                  <label className="label text-xs font-semibold text-base-content/50 uppercase">
                    Privacy
                  </label>
                  <select
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
                      {...register("accessLevel")}
                      disabled={userData?.isPremium === false}
                      className={`select select-bordered w-full ${
                        userData?.isPremium === false
                          ? "bg-base-200 text-base-content/40 cursor-not-allowed"
                          : "select-primary border-primary"
                      }`}
                    >
                      <option value="free">Free Lesson</option>
                      <option value="premium">💎 Premium Lesson</option>
                    </select>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;
