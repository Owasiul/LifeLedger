import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const StatsChart = ({ data, type = "area" }) => {
  // Default mock data if none provided
  const chartData = data || [
    { name: "Jan", lessons: 4, views: 240, likes: 40 },
    { name: "Feb", lessons: 3, views: 139, likes: 30 },
    { name: "Mar", lessons: 5, views: 380, likes: 55 },
    { name: "Apr", lessons: 4, views: 200, likes: 45 },
    { name: "May", lessons: 6, views: 420, likes: 60 },
    { name: "Jun", lessons: 5, views: 350, likes: 50 },
  ];

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "currentColor" }} />
            <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-base-100))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--color-base-content))" }}
            />
            <Line
              type="monotone"
              dataKey="lessons"
              stroke="hsl(var(--color-primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--color-primary))", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--color-secondary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--color-secondary))", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "currentColor" }} />
            <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-base-100))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--color-base-content))" }}
            />
            <Bar dataKey="lessons" fill="hsl(var(--color-primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="views" fill="hsl(var(--color-secondary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      case "area":
      default:
        return (
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="name" className="text-xs" tick={{ fill: "currentColor" }} />
            <YAxis className="text-xs" tick={{ fill: "currentColor" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-base-100))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              labelStyle={{ color: "hsl(var(--color-base-content))" }}
            />
            <Area
              type="monotone"
              dataKey="lessons"
              stroke="hsl(var(--color-primary))"
              fillOpacity={0.3}
              fill="hsl(var(--color-primary))"
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="hsl(var(--color-secondary))"
              fillOpacity={0.3}
              fill="hsl(var(--color-secondary))"
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;