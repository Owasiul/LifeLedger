import { BookOpen, Network, TrendingUp, Users } from "lucide-react";

const WhyLearn = ({ whylearn }) => {
  const iconMap = {
    notebook: BookOpen,
    people: Users,
    growth: TrendingUp,
    community: Network,
  };

  return (
    <div className="my-10 w-[90%] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-secondary">
          Why Learning From Life Matters
        </h2>
        <p className="mt-2 text-primary">
          Real experiences. Real lessons. Real growth.
        </p>
      </div>

      {/* Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {whylearn.map((learn) => {
          const Icon = iconMap[learn.icon];

          return (
            <div
              key={learn.id}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center
                         shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              {Icon && (
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
                    <Icon size={28} />
                  </div>
                </div>
              )}

              {/* Content */}
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                {learn.title}
              </h3>
              <p className="text-gray-600 text-sm">{learn.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyLearn;
