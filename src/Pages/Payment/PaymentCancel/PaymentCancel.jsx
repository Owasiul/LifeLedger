import React from "react";
import payFail from "../../../assets/PaymentCancel.mp4";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="relative flex flex-col items-center">
          {/* Video */}
          <div className="w-64 h-64 overflow-hidden rounded-full border-4 border-green-400 shadow-md">
            <video
              className="w-full h-full object-cover"
              loop
              autoPlay
              muted
              playsInline
            >
              <source src={payFail} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Success Text */}
          <h2 className="mt-6 text-3xl font-bold text-green-600 flex items-center gap-3">
            Payment Failed 😥
          </h2>

          {/* Optional Button */}
          <Link
            to="/"
            className="btn mt-6 px-6 py-2 bg-accent text-white font-semibold rounded-lg shadow hover:bg-sky-600 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
