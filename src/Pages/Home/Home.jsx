import React from "react";
import Slider from "./Ui/Slider/Slider";
import FeaturedLessons from "./Ui/FeaturedLessons/FeaturedLessons";
import { useLoaderData } from "react-router";
import WhyLearn from "./Ui/WhyLearn/WhyLearn";

const Home = () => {
  const whylearn = useLoaderData();
  return (
    <div>
      <Slider></Slider>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearn whylearn={whylearn}></WhyLearn>
    </div>
  );
};

export default Home;
