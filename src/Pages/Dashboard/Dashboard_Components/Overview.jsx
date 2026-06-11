import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpenTextIcon, Heart } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import Loading from "../../../Components/Loading/Loading";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-900">
        {payload[0].value} lesson{payload[0].value === 1 ? "" : "s"}
      </p>
    </div>
  );
};

const Overview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { userData } = useUser();

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: savedLessons = [], isLoading: savedLoading } = useQuery({
    queryKey: ["savedLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/saved-lessons?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const categoryChartData = useMemo(() => {
    const counts = lessons.reduce((acc, lesson) => {
      const category = lesson.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [lessons]);

  const monthlyChartData = useMemo(() => {
    const counts = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setDate(1);
      date.setMonth(date.getMonth() - (5 - index));
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        name: MONTH_LABELS[date.getMonth()],
        count: 0,
      };
    });

    lessons.forEach((lesson) => {
      if (!lesson.createdAt) return;
      const created = new Date(lesson.createdAt);
      const key = `${created.getFullYear()}-${created.getMonth()}`;
      const bucket = counts.find((item) => item.key === key);
      if (bucket) bucket.count += 1;
    });

    return counts.map(({ name, count }) => ({ name, count }));
  }, [lessons]);

  if (lessonsLoading || savedLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-1">
          Dashboard
        </p>
        <h2 className="text-3xl font-bold text-base-content">
          Overview
        </h2>
        <p className="text-sm text-base-content/70 mt-1">
          Your activity summary and contribution insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-sky-200 bg-linear-to-br from-sky-50 to-sky-100 p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-800/80">
              Lessons Created
            </h3>
            <p className="text-4xl font-bold text-sky-950 mt-2">
              {userData?.contributedLessons || lessons.length || 0}
            </p>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-sky-200 rounded-2xl">
            <BookOpenTextIcon size={28} className="text-sky-900" />
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-emerald-100 p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-800/80">
              Saved Favorites
            </h3>
            <p className="text-4xl font-bold text-emerald-950 mt-2">
              {savedLessons.length}
            </p>
          </div>
          <div className="w-14 h-14 flex items-center justify-center bg-emerald-200 rounded-2xl">
            <Heart size={28} className="text-emerald-900" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-base-content/60 mb-1">
              Analytics
            </p>
            <h3 className="text-lg font-semibold">Lessons by Category</h3>
          </div>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={categoryChartData} barSize={36}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-70 text-sm text-base-content/60">
              Create your first lesson to see category insights.
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-base-content/60 mb-1">
              Analytics
            </p>
            <h3 className="text-lg font-semibold">Monthly Contributions</h3>
          </div>
          {lessons.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyChartData} barSize={32}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-70 text-sm text-base-content/60">
              No contribution history yet for the last six months.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Recently Added Lessons</h3>
          <p className="text-sm text-base-content/60">
            Your latest contributions to the community
          </p>
        </div>
        {lessons.length > 0 ? (
          <div className="flex flex-col gap-3">
            {lessons.slice(0, 5).map((data) => (
              <div
                key={data?._id}
                className="group flex items-center gap-4 p-3 rounded-xl border border-base-200 hover:border-primary/30 hover:bg-base-200/40 transition-colors"
              >
                <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-base-200">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={data.image}
                    alt={data.title}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-base-content truncate">
                    {data.title}
                  </h4>
                  <p className="text-sm text-base-content/60">
                    {new Date(data.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/60 py-8 text-center">
            You have not published any lessons yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Overview;
