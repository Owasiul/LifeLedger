import { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "@heroui/react";

const Register = () => {
  const { registerWithEmail_Password, googleSignIn, updateUserData } =
    useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathname || "/";

  const [previewImage, setPreviewImage] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRegistration = async (data) => {
    try {
      const updateImage = data.photo?.[0];
      if (!updateImage) {
        Swal.fire("Error", "Profile image is required", "error");
        return;
      }

      //  Upload image to imgbb
      const formData = new FormData();
      formData.append("image", updateImage);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imgbb
      }`;

      const imgbbResponse = await axios.post(image_API_URL, formData);
      const uploadedImageUrl = imgbbResponse.data.data.url;

      // firebase registration
      await registerWithEmail_Password(data.email, data.password);

      //  Save user in DB
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: uploadedImageUrl,
      };
      await axiosSecure.post("/users", userInfo);
      //  Update Firebase profile
      await updateUserData({
        displayName: data.name,
        photoURL: uploadedImageUrl,
      });

      Swal.fire("Success", "Registration successful!", "success");

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire(
        "Registration Failed",
        error.message || "Something went wrong",
        "error",
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const signedInUser = result.user;

      const userInfo = {
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      };

      await updateUserData(userInfo);
      await axiosSecure.post("/users", userInfo);

      Swal.fire("Success", "Login successful!", "success");

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message || "Google login failed", "error");
    }
  };

  return (
    <div>
      <div className="head space-y-1.5 mt-14">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <h3 className="text-lg font-semibold mt-5">Register with LifeLedger</h3>
      </div>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
        <div className="flex items-center space-x-6 my-5">
          <div className="shrink-0">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="h-16 w-16 object-cover rounded-full"
              />
            ) : (
              <CircleUserRound size={64} className="dark:text-white" />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: true })}
            onChange={handleImageChange}
            className="cursor-pointer"
          />
        </div>

        {errors.photo && (
          <p className="text-red-700">Profile image is required</p>
        )}

        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full px-4 py-3 border rounded-lg"
        />
        {errors.name && <p className="text-red-700">Name is required</p>}

        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full px-4 py-3 border rounded-lg"
        />
        {errors.email && <p className="text-red-700">Email is required</p>}

        <input
          type="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
          })}
          placeholder="Password"
          className="w-full px-4 py-3 border rounded-lg"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-700">Password is required</p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-700">
            Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special
            character
          </p>
        )}

        <Button
          type="submit"
          color="secondary"
          className="w-full py-3 rounded-lg"
        >
          Register
        </Button>
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <NavLink to="/auth/login" className="text-violet-400 font-medium">
          Login
        </NavLink>
      </p>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t"></div>
        <span className="px-4 text-sm text-gray-500">Or</span>
        <div className="flex-1 border-t"></div>
      </div>

      <Button
        type="button"
        onClick={handleGoogleSignIn}
        variant="outline"
        color="default"
        className="w-full py-3 rounded-lg"
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
        Register with Google
      </Button>
    </div>
  );
};

export default Register;
