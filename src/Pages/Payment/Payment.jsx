import { Star, Zap } from "lucide-react";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handlePayment = async () => {
    const res = await axiosSecure.post("/create-checkout-session", {
      email: user.email,
    });
    console.log(res.data);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
    return res.data;
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="p-6 bg-base-100 rounded-xl shadow-xl border border-base-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">
            Choose Your Path
          </h2>
          <p className="text-sm text-base-content/70 mt-2">
            Level up your learning experience
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Head */}
            <thead>
              <tr className="text-base-content border-b border-base-300">
                <th className="bg-transparent text-lg font-semibold">
                  Features
                </th>
                <th className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="badge badge-ghost">Standard</span>
                    <span className="text-xl font-bold text-primary">Free</span>
                  </div>
                </th>
                <th className="text-center bg-base-200/50">
                  <div className="flex flex-col items-center gap-1">
                    <span className="badge badge-secondary gap-1">
                      <Star size={12} fill="currentColor" /> Pro
                    </span>
                    <span className="text-xl font-bold text-secondary">
                      1500 tk for life time
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-base-content">
              <tr>
                <td className="font-medium">Access Public Life Lessons</td>
                <td className="text-center">✔ Yes</td>
                <td className="text-center">✔ Yes</td>
              </tr>

              <tr>
                <td className="font-medium">Create Personal Life Lessons</td>
                <td className="text-center">Limited (Up to 5)</td>
                <td className="text-center">Unlimited</td>
              </tr>

              <tr>
                <td className="font-medium">
                  Private Lessons (Visibility Control)
                </td>
                <td className="text-center">❌ Not Available</td>
                <td className="text-center">✔ Available</td>
              </tr>

              <tr>
                <td className="font-medium">Save & Bookmark Lessons</td>
                <td className="text-center">Limited</td>
                <td className="text-center">Unlimited</td>
              </tr>

              <tr>
                <td className="font-medium">Access Premium Lessons</td>
                <td className="text-center">❌ No</td>
                <td className="text-center">✔ Yes</td>
              </tr>

              <tr>
                <td className="font-medium">Featured Contributor Badge</td>
                <td className="text-center">❌ No</td>
                <td className="text-center">✔ Yes</td>
              </tr>

              <tr>
                <td className="font-medium">Advanced Search & Filters</td>
                <td className="text-center">Basic</td>
                <td className="text-center">Advanced</td>
              </tr>

              <tr>
                <td className="font-medium">Weekly Reflection Insights</td>
                <td className="text-center">❌ No</td>
                <td className="text-center">✔ Yes</td>
              </tr>

              <tr>
                <td className="font-medium">Ad-Free Experience</td>
                <td className="text-center">❌ No</td>
                <td className="text-center">✔ Yes</td>
              </tr>
            </tbody>

            {/* Footer Actions */}
            <tfoot>
              <tr>
                <td></td>
                <td className="text-center py-6">
                  <button className="btn btn-outline btn-sm sm:btn-md btn-primary w-full max-w-30">
                    Current Plan
                  </button>
                </td>
                <td className="text-center py-6 bg-base-200/30 rounded-b-lg">
                  <button
                    onClick={handlePayment}
                    className="btn btn-secondary btn-sm sm:btn-md w-full max-w-30 shadow-lg shadow-secondary/20"
                  >
                    <Zap size={16} fill="currentColor" /> Upgrade
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Payment;
