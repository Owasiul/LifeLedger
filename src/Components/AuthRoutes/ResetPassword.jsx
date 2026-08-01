import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import useAuth from "../../Hooks/useAuth";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendResetPasswordMail } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (data) => {
    setAuthError("");
    setSuccess("");
    setLoading(true);
    try {
      await sendResetPasswordMail(data.email);
      setSuccess("Password reset email sent. Check your inbox.");
    } catch (error) {
      const messages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/invalid-email": "Invalid email address.",
        "auth/too-many-requests": "Too many requests. Please try again later.",
      };
      setAuthError(
        messages[error?.code] || "Failed to send reset email. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="head space-y-1.5">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <h3 className="text-lg font-semibold">
          Enter your email to receive a reset link
        </h3>
      </div>

      <div className="body my-5">
        <form onSubmit={handleSubmit(handleReset)} className="space-y-4">
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

          {authError && (
            <p className="text-red-500 text-sm font-medium">{authError}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm font-medium">{success}</p>
          )}

          <Button
            type="submit"
            isLoading={loading}
            color="secondary"
            className="mt-5 w-full font-semibold py-3 rounded-lg text-lg"
          >
            Send Reset Email
          </Button>
        </form>

        <p className="text-center text-sm text-primary mt-4">
          Remembered your password?{" "}
          <NavLink
            to="/auth/login"
            className="text-lime-600 hover:text-lime-700 font-medium"
          >
            Back to Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
