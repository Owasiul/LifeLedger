import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInwithEmail_Password, googleSignIn, updateUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.pathname || "/";

  // Sign in with email and password
  const handleSignIn = async (data) => {
    try {
      const result = await signInwithEmail_Password(data.email, data.password);

      const signedInUser = result.user;

      await updateUserData({
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const signedInUser = result.user;

      await updateUserData({
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      });

      navigate(from, { replace: true });
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
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium dark:text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <NavLink
            to="/auth/resetpassword"
            className="font-black underline cursor-pointer"
          >
            Forget Password?
          </NavLink>

          <button
            type="submit"
            className="btn mt-5 w-full bg-secondary text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-primary mt-4">
          Don't have any account?{" "}
          <NavLink
            state={location.state}
            to="/auth/register"
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            Register
          </NavLink>
        </p>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
