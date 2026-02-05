import React from "react";
// slide images
import slide1 from "../../../../assets/slide1.png";
import slide2 from "../../../../assets/slide2.png";
import slide3 from "../../../../assets/slide3.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const Slider = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-64 md:h-80 lg:h-170"
      >
        <SwiperSlide className="relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center px-6 md:px-12 w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Audit the Detours
            </h2>
            <p className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              Real growth happens when the plan fails but you don't. Stop
              looking for a straight line and start appreciating the
              detours—those are the parts that actually taught you how to drive.
            </p>
            <button className="btn my-4 font-bold btn-accent text-white">
              Start writting
            </button>
          </div>
          <img
            className="object-cover w-full h-full"
            src={slide1}
            alt="Audit the Detours"
          />
        </SwiperSlide>

        <SwiperSlide className="relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center px-6 md:px-12 w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Shortcuts from the Hive
            </h2>
            <p className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              One person's mistake is the whole community's shortcut. Let's stop
              gatekeeping the "how-to" and start crowdsourcing the "how-we-won"
              so we can all level up twice as fast.
            </p>
            <button className="btn my-4 btn-primary font-bold">
              Explore Public Lessons
            </button>
          </div>
          <img
            className="object-cover w-full h-full"
            src={slide2}
            alt="Shortcuts from the Hive"
          />
        </SwiperSlide>

        <SwiperSlide className="relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center px-6 md:px-12 w-full">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Stop Skimming, Start Scaling
            </h2>
            <p className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
              Stop skimming the surface and start owning the results. Unlock our
              Premium Vault for the high-level strategies and specific
              blueprints that turn "trying" into "done."
            </p>
            <button className="btn btn-secondary my-4 font-bold">
              Upgrade to premium
            </button>
          </div>
          <img
            className="object-cover w-full h-full"
            src={slide3}
            alt="Stop Skimming, Start Scaling"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
