import { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const { registerWithEmail_Password, googleSignIn, updateUserData } =
    useAuth();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleRegistration = async (data) => {
    console.log(data);
    const updateImage = data.photo[0];

    if (!updateImage) {
      console.error("No image selected");
      return;
    }

    try {
      // First register the user
      const result = await registerWithEmail_Password(
        data.email,
        data.password,
      );

      console.log("User registered:", result.user);

      // Create FormData and upload image to imgbb
      const formData = new FormData();
      formData.append("image", updateImage);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_Imgb
      }`;

      // ✔️ Await the imgbb upload
      const imgbbResponse = await axios.post(image_API_URL, formData);
      console.log("Image uploaded successfully:", imgbbResponse.data);

      const uploadedImageUrl = imgbbResponse.data.data.url;

      // ✔️ Update user data into db
      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL: uploadedImageUrl,
      };

      const dbResponse = await axiosSecure.post("/users", userInfo);
      if (dbResponse.data.insertedId) {
        console.log("User created in db", dbResponse.data.insertedId);
      }

      // ✔️ Update Firebase user profile with name and uploaded image URL
      await updateUserData({
        displayName: data.name,
        photoURL: uploadedImageUrl,
      });

      console.log("User profile updated successfully");

      // ✔️ Navigate to the desired location
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Registration error:", error);
      // Optional: Show error message to user
      Swal.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const signedInUser = result.user;
      // console.log(signedInUser);
      // Data object for your database
      const userInfo = {
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      };
      // user update via firebase
      await updateUserData({
        displayName: signedInUser.displayName,
        email: signedInUser.email,
        photoURL: signedInUser.photoURL,
      });
      // update the data in db
      axiosSecure.post("/users", userInfo);

      // console.log(result);
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="head space-y-1.5 mt-14">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <h3 className="text-lg font-semibold mt-5">Register with LifeLedger</h3>
      </div>

      <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
        {/* Image Upload Section */}
        <div className="flex items-center space-x-6 my-5">
          <div className="shrink-0">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="h-16 w-16 object-cover rounded-full"
              />
            ) : (
              <CircleUserRound
                size={64}
                className="text-white dark:text-gray-500"
              />
            )}
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-500 file:text-white
                hover:file:bg-violet-600
                cursor-pointer"
            />
          </label>
        </div>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-700 mt-3">Name is required</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-700 mt-3">Email is required</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]{8,}$/,
            })}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-700 mt-3">Password is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-700 mt-3">
              Minimum eight characters, at least one uppercase letter, one
              lowercase letter, one number and one special character needed
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="btn w-full bg-secondary hover:bg-primary text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          Register
        </button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-white mt-4">
        Already have an account?{" "}
        <NavLink
          to="/auth/login"
          className="text-violet-400 hover:text-violet-700 font-medium"
        >
          Login
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
        Register with google
      </button>
    </div>
  );
};

export default Register;
