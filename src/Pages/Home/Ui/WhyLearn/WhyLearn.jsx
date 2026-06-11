import { BookOpen, Network, TrendingUp, Users } from "lucide-react";

const WhyLearn = ({ whylearn }) => {
  const iconMap = {
    notebook: BookOpen,
    people: Users,
    growth: TrendingUp,
    community: Network,
  };

  return (
    <section className="py-14 sm:py-16 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary/70 font-semibold mb-2">
            Why It Matters
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
            Why Learning From Life Matters
          </h2>
          <p className="mt-3 text-base-content/70">
            Real experiences. Real lessons. Real growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {whylearn.map((learn) => {
          const Icon = iconMap[learn.icon];

          return (
            <div
              key={learn.id}
              className="bg-base-100 border border-base-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
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
    </section>
  );
};

export default WhyLearn;
