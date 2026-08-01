import { Check, Sparkles, Star, X, Zap } from "lucide-react";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";

const FEATURES = [
  { label: "Access public life lessons", standard: true, pro: true },
  { label: "Create personal life lessons", standard: "Up to 5", pro: "Unlimited" },
  { label: "Private lessons (visibility control)", standard: false, pro: true },
  { label: "Save & bookmark lessons", standard: "Limited", pro: "Unlimited" },
  { label: "Access premium lessons", standard: false, pro: true },
  { label: "Featured contributor badge", standard: false, pro: true },
  { label: "Advanced search & filters", standard: "Basic", pro: "Advanced" },
  { label: "Weekly reflection insights", standard: false, pro: true },
  { label: "Ad-free experience", standard: false, pro: true },
];

const FeatureCell = ({ value }) => {
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-pink-400" strokeWidth={2.5} />;
  }
  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-neutral-600" strokeWidth={2.5} />;
  }
  return <span className="text-sm font-medium text-neutral-200">{value}</span>;
};

const Pricing = () => {
  const axiosSecure = useAxiosSecure();
  const { userData } = useUser();
  const { user } = useAuth();

  const handlePayment = async () => {
    const res = await axiosSecure.post(`/create-checkout-session`, {
      email: user.email,
    });
    if (res.data.url) {
      window.location.href = res.data.url;
    }
    return res.data;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Navbar />

      <main className="relative mx-auto max-w-5xl px-6 py-16">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-pink-500/10 blur-[120px]" />

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl sm:p-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose your path
            </h2>
            <p className="mt-2 text-sm font-medium text-neutral-400">
              Level up your learning experience
            </p>
          </div>

          {/* Plan header cards */}
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 py-6 text-center">
              <span className="rounded-full border border-neutral-700 px-3 py-1 text-xs font-semibold text-neutral-400">
                Standard
              </span>
              <span className="text-2xl font-bold text-neutral-200">Free</span>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-pink-400 bg-gradient-to-b from-pink-500/10 to-transparent py-6 text-center shadow-[0_0_40px_-10px_rgba(244,63,183,0.35)]">
              <span className="flex items-center gap-1 rounded-full bg-pink-400 px-3 py-1 text-xs font-bold text-pink-950">
                <Star size={12} fill="currentColor" />
                Pro
              </span>
              <span className="text-2xl font-bold text-pink-300">
                1500 tk for lifetime
              </span>
            </div>
          </div>

          {/* Feature comparison table */}
          <div className="overflow-x-auto rounded-xl border border-neutral-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-left text-neutral-400">
                  <th className="bg-transparent px-4 py-3 font-semibold">
                    Core features
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Standard
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-pink-300">
                    Pro
                  </th>
                </tr>
              </thead>

              <tbody>
                {FEATURES.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-neutral-800/60 ${
                      i % 2 === 1 ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-neutral-300">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <FeatureCell value={row.standard} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <FeatureCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td className="px-4 py-5"></td>
                  {!userData?.isPremium ? (
                    <>
                      <td className="px-4 py-5 text-center">
                        <button className="w-full max-w-[140px] rounded-xl border border-pink-400 py-2 text-xs font-bold text-pink-300 transition-colors hover:bg-pink-400/10 active:scale-95 sm:text-sm">
                          Current plan
                        </button>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <button
                          onClick={handlePayment}
                          className="mx-auto flex w-full max-w-[140px] items-center justify-center gap-1.5 rounded-xl bg-fuchsia-500 py-2 text-xs font-bold text-white shadow-lg transition-opacity hover:opacity-90 active:scale-95 sm:text-sm"
                        >
                          <Zap size={14} fill="currentColor" />
                          Upgrade
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-5"></td>
                      <td className="px-4 py-5 text-center">
                        <button className="w-full max-w-[140px] rounded-xl border border-pink-400 py-2 text-xs font-bold text-pink-300 transition-colors hover:bg-pink-400/10 active:scale-95 sm:text-sm">
                          Current plan
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;