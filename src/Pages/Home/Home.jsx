import React from "react";
import Slider from "./Ui/Slider/Slider";
import FeaturedLessons from "./Ui/FeaturedLessons/FeaturedLessons";
import { useLoaderData } from "react-router";
import WhyLearn from "./Ui/WhyLearn/WhyLearn";
import TopContributers from "./Ui/topContributers/TopContributers";

const Home = () => {
  const whylearn = useLoaderData();
  return (
    <div>
      <Slider></Slider>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearn whylearn={whylearn}></WhyLearn>
      <TopContributers></TopContributers>
    </div>
  );
};

export default Home;
