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
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setGoogleLoading(true);
    try {
      const result = await googleSignIn();
      const signedInUser = result?.user;
      if (signedInUser) {
        await updateUserData({
          displayName: signedInUser.displayName,
          email: signedInUser.email,
          photoURL: signedInUser.photoURL,
        });
      }
      navigate(from, { replace: true });
    } catch (error) {
      const messages = {
        "auth/popup-closed-by-user": "Google sign-in was cancelled.",
        "auth/cancelled-popup-request": "Google sign-in was cancelled.",
        "auth/popup-blocked":
          "Pop-up blocked by browser. Please allow pop-ups and try again.",
        "auth/account-exists-with-different-credential":
          "An account already exists with this email using a different sign-in method.",
      };
      setAuthError(
        messages[error?.code] || "Google sign-in failed. Please try again.",
      );
    } finally {
      setGoogleLoading(false);
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
          onClick={handleGoogleSignIn}
          isLoading={googleLoading}
          variant="outline"
          color="default"
          className="w-full font-medium py-3 rounded-lg flex items-center justify-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
            id="google"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            ></path>
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            ></path>
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            ></path>
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            ></path>
          </svg>
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
