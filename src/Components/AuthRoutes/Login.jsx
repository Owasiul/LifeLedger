import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInwithEmail_Password, googleSignIn, updateUserData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(""); // ← add this
  const [loading, setLoading] = useState(false); // ← add this

  const from = location?.state?.pathname || "/";

  const handleSignIn = async (data) => {
    setAuthError("");
    setLoading(true);
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
      // map Firebase error codes to readable messages
      const messages = {
        "auth/wrong-password": "Incorrect password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/too-many-requests":
          "Account temporarily locked. Reset your password or try later.",
        "auth/invalid-credential": "Invalid email or password.",
      };
      setAuthError(messages[error.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ... googleSignIn stays the same

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
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <NavLink
            to="/auth/resetpassword"
            className="font-black underline cursor-pointer"
          >
            Forget Password?
          </NavLink>

          {/* ← show Firebase auth errors here */}
          {authError && (
            <p className="text-red-500 text-sm font-medium">{authError}</p>
          )}

          <Button
            type="submit" // ← removed the wrong onClick
            isLoading={loading} // ← HeroUI built-in loading state
            color="secondary"
            className="mt-5 w-full font-semibold py-3 rounded-lg text-lg"
          >
            Login
          </Button>
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

        <Button
          type="button"
          onClick={googleSignIn}
          variant="outline"
          color="default"
          className="w-full font-medium py-3 rounded-lg flex items-center justify-center gap-3"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
