import { Link } from "react-router";
import slide1 from "../../../../assets/slide1.png";
import slide2 from "../../../../assets/slide2.png";
import slide3 from "../../../../assets/slide3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  {
    image: slide1,
    title: "Audit the Detours",
    description:
      "Real growth happens when the plan fails but you don't. Learn from the moments that actually taught you how to move forward.",
    cta: "Start Writing",
    to: "/auth/register",
    btnClass: "btn-accent",
  },
  {
    image: slide2,
    title: "Shortcuts from the Hive",
    description:
      "One person's mistake is the whole community's shortcut. Discover lessons shared by people who have already been there.",
    cta: "Explore Lessons",
    to: "/all-lessons",
    btnClass: "btn-primary",
  },
  {
    image: slide3,
    title: "Stop Skimming, Start Scaling",
    description:
      "Unlock premium strategies and practical blueprints that turn reflection into real progress.",
    cta: "View Plans",
    to: "/pricing",
    btnClass: "btn-secondary",
  },
];

const Slider = () => {
  return (
    <section className="relative">
      <Swiper
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className="hero-swiper h-[420px] md:h-[520px] lg:h-[620px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title} className="relative">
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/50 to-slate-900/20 z-10" />
            <div className="absolute z-20 inset-0 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-sky-300 mb-3">
                    LifeLedger
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed mb-6">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.to}
                    className={`btn ${slide.btnClass} text-white font-semibold px-6`}
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
            <img
              className="object-cover w-full h-full"
              src={slide.image}
              alt={slide.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
