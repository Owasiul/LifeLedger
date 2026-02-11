import React from "react";
import Logo from "../../assets/Logo.png";
import { Outlet, useLocation } from "react-router";
import loginImg from "../../assets/LoginImg.png";
import registerImg from "../../assets/registerImg.png";
const AuthLayout = () => {
  const location = useLocation();
  return (
    <div>
      <div className="">
        <div className="min-h-screen flex flex-col">
          {/* Logo at the top left */}
          <div className="absolute top-8 left-8 z-10">
            <img
              className="w-28 object-contain bg-white rounded-full"
              src={Logo}
              alt=""
            />
          </div>

          {/* Main content area with two columns */}
          <div className="flex flex-col lg:flex-row flex-1 lg:mt-0 mt-20">
            {/* Left side - Form area */}
            <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-10 py-8 lg:py-0">
              <div className="w-full max-w-md">
                <Outlet />
              </div>
            </div>

            {/* Right side - Image area */}
            <div className="w-full lg:w-1/2 hidden bg-[#2610ecb4] lg:flex items-center justify-center py-8">
              <div>
                {" "}
                {location.pathname === "/auth/login" ? (
                  <img src={loginImg} alt="Login" />
                ) : location.pathname === "/auth/register" ? (
                  <img src={registerImg} alt="Register" />
                ) : null}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
