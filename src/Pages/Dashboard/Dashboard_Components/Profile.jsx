import React, { useMemo } from "react";
import useUser from "../../../Hooks/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  ArrowRightIcon,
  Bookmark,
  LockKeyholeIcon,
  Mail,
  Pencil,
  PencilIcon,
  UserStar,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { Button, Card } from "@heroui/react";

const Profile = () => {
  const { userData } = useUser();
  const { user, updateUserData } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  const { data: lessons = [] } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const publicLessons = useMemo(
    () => lessons.filter((lesson) => lesson.visibility === "public"),
    [lessons],
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const { data: savedLessons = [] } = useQuery({
    queryKey: ["savedLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/saved-lessons?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateProfile = async (data) => {
    try {
      let photoURL = user?.photoURL;

      if (data.photoURL?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photoURL[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imgbb}`,
          formData,
        );
        photoURL = imgRes.data.data.url;
      }

      const displayName = data.displayName?.trim() || user?.displayName;

      await axiosSecure.patch("/update-user", {
        email: user.email,
        displayName,
        photoURL,
      });

      await updateUserData({ displayName, photoURL });

      queryClient.invalidateQueries({ queryKey: ["users"] });

      Swal.fire({
        title: "Successful!",
        text: "Your profile has been updated successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to update profile",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 ">
      <div className="w-full mx-auto bg-[#134e4a] rounded-4xl p-8 mb-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row items-center gap-8">
          {/* Avatar with White Border */}
          <div className="relative">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-white/20 shadow-xl"
              src={user?.photoURL}
              alt={user?.displayName || "User"}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#134e4a] rounded-full"></div>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold tracking-tight">
                {user?.displayName}
              </h1>
              {userData?.isPremium && (
                <span className="bg-[#fbbf24] text-[#78350f] text-xs font-black px-4 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1 self-center">
                  Premium ⭐
                </span>
              )}
              {userData?.role === "admin" && (
                <span className="bg-[#fbbf24] text-[#78350f] text-xs font-black px-4 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1 self-center">
                  Admin <UserStar />
                </span>
              )}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-emerald-100/70 mb-6">
              <span className="text-lg flex items-center gap-2">
                <Mail size={20} />
                {user?.email || "user@email.com"}
                <LockKeyholeIcon color="olive" size={20} />{" "}
              </span>{" "}
            </div>

            {/* Stats - Circular icon style from reference */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">
                  <Pencil />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-none">
                    {userData?.contributedLessons ?? lessons.length}
                  </p>
                  <p className="text-xs font-medium mt-1">Lessons Created</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">
                  <Bookmark />
                </div>
                <div>
                  <p className="text-2xl font-bold leading-none">
                    {savedLessons?.length || 0}
                  </p>
                  <p className="text-xs font-medium mt-1">Lessons Saved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="lg:self-start">
            <Menu as="div" className="relative inline-block">
              <MenuButton className="bg-white text-[#134e4a] hover:bg-emerald-50 font-bold px-4 py-3 rounded-xl transition-all shadow-lg text-sm flex items-center justify-center gap-2">
                <PencilIcon className="w-4 h-4" />
                Edit Profile
              </MenuButton>

              <MenuItems
                onClickCapture={(e) => e.stopPropagation()}
                anchor="bottom end"
                className="z-50 w-72 mt-2 rounded-xl border border-gray-100 bg-white shadow-xl focus:outline-none overflow-hidden"
              >
                <form onSubmit={handleSubmit(updateProfile)}>
                  <div className="p-4 flex flex-col gap-4">
                    <p className="text-sm font-semibold text-gray-700 border-b border-gray-100 pb-2">
                      Update Profile
                    </p>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Name
                      </label>
                      <input
                        type="text"
                        {...register("displayName")}
                        defaultValue={user?.displayName}
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("photoURL")}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <Button
                      type="submit"
                      color="primary"
                      className="w-full text-sm font-semibold py-2 rounded-lg"
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Grid Header */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <h2 className="text-xl font-bold whitespace-nowrap">
          My Public Lessons{" "}
          <span className=" font-medium">({publicLessons.length})</span>
        </h2>
        <div className="h-px bg-slate-200 w-full"></div>
      </div>

      {/* Lessons Grid - Matching card style from reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {publicLessons.length === 0 && (
          <p className="col-span-full text-center text-base-content/60 py-12">
            You have no public lessons yet. Create one and set its visibility to
            public.
          </p>
        )}
        {publicLessons.map((data) => (
          <Card
            key={data._id}
            className="md:w-96 w-fit group bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-16/10 overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Content */}
            <Card.Body className="p-7">
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                {data.title}
              </h2>

              <p className="mt-3 text-gray-500 text-sm leading-relaxed line-clamp-2">
                {data.description}
              </p>

              {/* Footer */}
              <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {formatDate(data.createdAt)}
                </span>

                <Button
                  onClick={() => navigate(`/all-lessons/${data._id}`)}
                  variant="ghost"
                  color="default"
                  className="flex items-center gap-1 text-accent font-semibold text-sm cursor-pointer group/link"
                >
                  <span>View Details</span>
                  <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">
                    <ArrowRightIcon />
                  </span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;