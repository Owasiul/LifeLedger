import { Link } from "react-router";
import { useLoaderData } from "react-router";
import Slider from "./Ui/Slider/Slider";
import FeaturedLessons from "./Ui/FeaturedLessons/FeaturedLessons";
import WhyLearn from "./Ui/WhyLearn/WhyLearn";
import TopContributers from "./Ui/topContributers/TopContributers";
import SavedLessons from "./Ui/SavedLessons/SavedLessons";
import { ArrowRight, PenLine } from "lucide-react";
import { Button } from "@heroui/react";

const Home = () => {
  const whylearn = useLoaderData();

  return (
    <div className="bg-base-100">
      <Slider />

      <FeaturedLessons />

      <WhyLearn whylearn={whylearn} />

      <TopContributers />

      <SavedLessons />

      <section className="py-16 sm:py-20 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-5">
            <PenLine size={24} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Ready to share what life taught you?
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto mb-8">
            Join LifeLedger to document lessons, learn from others, and build a
            personal library of wisdom that grows with you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button as={Link} to="/auth/register" color="primary" className="gap-2">
              Get Started Free
              <ArrowRight size={18} />
            </Button>
            <Button as={Link} to="/all-lessons" variant="outline" color="default">
              Browse Lessons
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;