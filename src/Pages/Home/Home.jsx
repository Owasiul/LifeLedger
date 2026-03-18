import React from "react";
import Slider from "./Ui/Slider/Slider";
import FeaturedLessons from "./Ui/FeaturedLessons/FeaturedLessons";
import { useLoaderData } from "react-router";
import WhyLearn from "./Ui/WhyLearn/WhyLearn";
import TopContributers from "./Ui/topContributers/TopContributers";
import SavedLesson from "../Dashboard/Dashboard_Components/SavedLesson";
import SavedLessons from "./Ui/SavedLessons/SavedLessons";

const Home = () => {
  const whylearn = useLoaderData();
  return (
    <div>
      <Slider></Slider>
      <FeaturedLessons></FeaturedLessons>
      <WhyLearn whylearn={whylearn}></WhyLearn>
      <TopContributers></TopContributers>
      <SavedLessons></SavedLessons>
    </div>
  );
};

export default Home;
