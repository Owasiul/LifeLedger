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
              <CircleUserRound
                size={64}
                className="text-white dark:text-gray-500"
              />
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

        <button
          type="submit"
          className="btn w-full bg-secondary text-white py-3 rounded-lg"
        >
          Register
        </button>
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

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full bg-gray-100 py-3 rounded-lg text-secondary"
      >
        Register with Google
      </button>
    </div>
  );
};

export default Register;
