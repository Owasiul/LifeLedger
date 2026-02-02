import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const { register, handleSubmit, user } = useForm();
  const { signInwithEmail_Password, googleSignIn, updateUserData } = useAuth();
  //   const axiosSecure = useAxiosSecure();
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  // sign in with email and password
  const handleSignIn = async (data) => {
    console.log(data);
    try {
      const result = await signInwithEmail_Password(
        data.email,
        data.password,
      ).then(() => {
        navigate(location?.state || "/");
      });
      console.log(result);
      updateUserData({
        displayName: data.name,
        email: data.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // google sign in
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const signedInUser = result.user;

      // Data object for your database
      //   const userInfo = {
      //     displayName: signedInUser.displayName,
      //     email: signedInUser.email,
      //     photoURL: signedInUser.photoURL,
      //   };
      // user update via firebase
      await updateUserData({
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      });
      // update the data in db
      //   axiosSecure.post("/users", userInfo).then(() => {
      //     navigate(location?.state || "/");
      //   });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="head space-y-1.5">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <h3 className="text-lg font-semibold">Login with Lifeledger</h3>
      </div>
      <div className="body my-5">
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium dark:text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium dark:text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <NavLink
            to="/auth/resetpassword"
            className="font-black underline cursor-pointer"
          >
            {" "}
            Forget Password?
          </NavLink>

          {/* login Button */}
          <button
            type="submit"
            className="btn mt-5 w-full bg-secondary text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-semibold text-lg"
          >
            Login
          </button>
        </form>
        {/* Login Link */}
        <p className="text-center text-sm text-white mt-4">
          Don't have any account?{" "}
          <NavLink
            state={location.state}
            to="/auth/register"
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            Register
          </NavLink>
        </p>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Register Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Login with google
        </button>
      </div>
    </div>
  );
};

export default Login;
