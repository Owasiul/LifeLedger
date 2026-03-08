import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// ─── Toggle Switch ────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full border border-white/10 cursor-pointer shrink-0 transition-all duration-300 ${
      checked ? "bg-linear-to-r from-cyan-300 to-green-300" : "bg-white/10"
    }`}
  >
    <div
      className={`absolute top-[3px] w-4 h-4 rounded-full shadow transition-all duration-300 ${
        checked ? "left-[22px] bg-gray-950" : "left-[3px] bg-gray-500"
      }`}
    />
  </div>
);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-950/95 border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-[11px] tracking-widest uppercase mb-2 text-gray-200">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-xs w-16 text-gray-200">{entry.name}</span>
          <span className="text-sm font-semibold text-white">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, colorClass }) => (
  <div
    className={`p-6 rounded-2xl border shadow-lg flex flex-col gap-2 ${colorClass}`}
  >
    <span className="text-[11px] tracking-widest uppercase font-medium opacity-80">
      {label}
    </span>
    <span className="text-5xl font-bold leading-none">{value ?? "—"}</span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminOverview = () => {
  const [type, setType] = useState("monthly");
  const [userType, setUserType] = useState("monthly");
  const axiosSecure = useAxiosSecure();

  const { data: allLessons = {} } = useQuery({
    queryKey: ["allLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-lessons`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const { data: reports = [] } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reports`);
      return res.data;
    },
  });

  const { data: lessonsGrowth = [] } = useQuery({
    queryKey: ["lessons-growth", type],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons-growth?type=${type}`);
      return res.data;
    },
  });
  const chartData = [...lessonsGrowth]
    .sort((a, b) => {
      if (a._id.year !== b._id.year) return a._id.year - b._id.year;
      if (type === "weekly") return (a._id.week ?? 0) - (b._id.week ?? 0);
      return (a._id.month ?? 0) - (b._id.month ?? 0);
    })
    .map((item) => ({
      name:
        type === "weekly"
          ? `W${item._id.week} '${String(item._id.year).slice(-2)}`
          : `${item._id.month}/${String(item._id.year).slice(-2)}`,
      lessons: item.lessons,
    }));
  const { data: usersGrowth = [] } = useQuery({
    queryKey: ["users-growth", userType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-growth?type=${userType}`);
      return res.data;
    },
  });
  const userChartData = [...usersGrowth]
    .sort((a, b) => {
      if (a._id.year !== b._id.year) return a._id.year - b._id.year;
      if (userType === "weekly") return (a._id.week ?? 0) - (b._id.week ?? 0);
      return (a._id.month ?? 0) - (b._id.month ?? 0);
    })
    .map((item) => ({
      name:
        userType === "weekly"
          ? `W${item._id.week} '${String(item._id.year).slice(-2)}`
          : `${item._id.month}/${String(item._id.year).slice(-2)}`,
      users: item.users,
    }));

  const isWeekly = type === "weekly";

  return (
    <div className="w-[90%] mx-auto my-10 flex flex-col gap-9">
      {/* ── Title ── */}
      <div className="text-center">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-2">
          Admin Dashboard
        </p>
        <h1 className="text-4xl font-bold">Platform Overview</h1>
        <p className="mt-2 text-sm">Here is all the data of your platform</p>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          label="Lessons Created"
          value={allLessons.total}
          colorClass="bg-primary border-primary"
        />
        <StatCard
          label="Users"
          value={users?.length}
          colorClass="bg-secondary border-secondary"
        />
        <StatCard
          label="Reported Lessons"
          value={reports?.length}
          colorClass="bg-accent border-accent"
        />
      </div>

      {/* ── Chart Card ── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Chart Header */}
        <div className="flex justify-between items-start flex-wrap gap-4 mb-7">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase mb-1">
              Lessons Growth
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              {isWeekly ? "Weekly" : "Monthly"} Lesson Trends
            </h2>
          </div>

          {/* Period Toggle */}
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <span
              className={`text-xs tracking-wide transition-opacity duration-200 ${isWeekly ? "opacity-30" : "opacity-100"}`}
            >
              Monthly
            </span>
            <Toggle
              checked={isWeekly}
              onChange={() =>
                setType((t) => (t === "monthly" ? "weekly" : "monthly"))
              }
            />
            <span
              className={`text-xs tracking-wide transition-opacity duration-200 ${isWeekly ? "opacity-100" : "opacity-30"}`}
            >
              Weekly
            </span>
          </div>
        </div>

        {/* Lessons Chart */}
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
          >
            <defs>
              <filter
                id="glow-lessons"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              stroke="rgba(0,0,0,0.06)"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: "rgba(0,0,0,0.08)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(0,0,0,0.08)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="lessons"
              name="Lessons"
              stroke="#8884d8"
              strokeWidth={2.5}
              dot={{ fill: "#8884d8", r: 4, strokeWidth: 0 }}
              activeDot={{
                r: 7,
                fill: "#8884d8",
                filter: "url(#glow-lessons)",
              }}
              filter="url(#glow-lessons)"
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Users Chart */}
      </div>
      {/* ── User Growth Chart Card ── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-7">
          <div>
            <p className="text-[11px] tracking-[0.18em] uppercase mb-1">
              User Growth
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              {userType === "weekly" ? "Weekly" : "Monthly"} User Registrations
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <span
              className={`text-xs tracking-wide transition-opacity duration-200 ${userType === "weekly" ? "opacity-30" : "opacity-100"}`}
            >
              Monthly
            </span>
            <Toggle
              checked={userType === "weekly"}
              onChange={() =>
                setUserType((t) => (t === "monthly" ? "weekly" : "monthly"))
              }
            />
            <span
              className={`text-xs tracking-wide transition-opacity duration-200 ${userType === "weekly" ? "opacity-100" : "opacity-30"}`}
            >
              Weekly
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={userChartData}
            margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
          >
            <defs>
              <filter
                id="glow-users"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              stroke="rgba(0,0,0,0.06)"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11 }}
              axisLine={{ stroke: "rgba(0,0,0,0.08)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(0,0,0,0.08)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={{ fill: "#34d399", r: 4, strokeWidth: 0 }}
              activeDot={{ r: 7, fill: "#34d399", filter: "url(#glow-users)" }}
              filter="url(#glow-users)"
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminOverview;
