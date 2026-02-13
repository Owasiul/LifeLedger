import React from "react";
import Lottie from "lottie-react";
import animation from "../../../public/Error 404.json";
const Error = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Lottie animationData={animation} loop={true}></Lottie>
    </div>
  );
};

export default Error;
