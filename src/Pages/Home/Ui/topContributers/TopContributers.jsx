import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const medals = ["🥇", "🥈", "🥉"];
const ringColors = [
  "ring-yellow-400 shadow-yellow-200",
  "ring-slate-400 shadow-slate-200",
  "ring-orange-400 shadow-orange-200",
];
const badgeColors = [
  "bg-yellow-50 text-yellow-700 border-yellow-200",
  "bg-slate-50 text-slate-600 border-slate-200",
  "bg-orange-50 text-orange-600 border-orange-200",
];
const accentColors = ["text-yellow-500", "text-slate-500", "text-orange-500"];

const TopContributers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: topContributers = [], isLoading } = useQuery({
    queryKey: ["topContributers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-contributers");
      return res.data;
    },
  });

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-indigo-400 font-semibold mb-2">
          This Week
        </p>
        <h2
          className="text-4xl font-black text-gray-900 leading-tight"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
        >
          Top Contributors
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-linear-to-r from-transparent to-indigo-300" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <div className="h-px w-12 bg-linear-to-l from-transparent to-indigo-300" />
        </div>
      </div>

      {/* Loading */}
      {isLoading && <Loading />}

      {/* Cards */}
      {!isLoading && topContributers.length > 0 && (
        <div className="flex flex-col sm:flex-row items-end justify-center gap-4">
          {topContributers.map((contributor, idx) => (
            <div
              key={contributor._id || idx}
              className={`
                relative flex-1 max-w-55 w-full
                bg-white border border-gray-100
                rounded-2xl p-6 flex flex-col items-center text-center
                shadow-sm hover:shadow-lg transition-all duration-300
                hover:-translate-y-1
                ${idx === 0 ? "sm:mb-6" : idx === 1 ? "sm:mb-3" : ""}
              `}
            >
              {/* Rank badge */}
              <span
                className={`
                  absolute -top-3 left-1/2 -translate-x-1/2
                  text-xs font-bold px-3 py-1 rounded-full border
                  ${badgeColors[idx]}
                `}
              >
                #{idx + 1}
              </span>

              {/* Medal */}
              <span className="text-2xl mb-3 mt-1">{medals[idx]}</span>

              {/* Avatar */}
              <div
                className={`ring-2 ${ringColors[idx]} shadow-md rounded-full mb-4`}
              >
                <img
                  src={contributor.photoURL}
                  alt={contributor.displayName}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.displayName)}&background=6366f1&color=fff`;
                  }}
                />
              </div>

              {/* Name */}
              <p className="font-bold text-gray-800 text-sm leading-snug truncate w-full">
                {contributor.displayName}
              </p>

              {/* Divider */}
              <div className="w-10 h-px bg-gray-100 my-3" />

              {/* Lesson count */}
              <p className={`text-3xl font-black ${accentColors[idx]}`}>
                {contributor.lessonsThisWeek}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 tracking-wide">
                {contributor.lessonsThisWeek === 1 ? "lesson" : "lessons"} this
                week
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && topContributers.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-4xl mb-3">✍️</p>
          <p className="text-gray-700 font-semibold">
            No contributors yet this week
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Be the first to share a lesson!
          </p>
        </div>
      )}
    </section>
  );
};

export default TopContributers;
