import { useState, useRef, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { LogOutIcon, LucideLayoutDashboard, Star } from "lucide-react";
import { Link } from "react-router";
import useUser from "../../../Hooks/useUser";

const AvatarDropdown = () => {
  const { user, LogOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userData } = useUser();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    LogOut().then((error) => console.log(error));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img src={user?.photoURL} alt="User avatar" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-lg shadow-xl border border-base-300 z-50">
          {/* User Info Section */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              {/* user img */}
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} alt="User" />
                </div>
              </div>
              {/* user name */}
              <div>
                <h3 className="font-semibold">{user?.displayName} </h3>
                <p className="text-sm text-base-content/60">See your profile</p>
              </div>
              <div>
                {userData?.isPremium && <span className="text-2xl"> ⭐ </span>}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2 border-t border-base-300">
            <Link
              to="/dashboard"
              className="btn btn-ghost justify-start w-full flex flex-row  gap-2 py-3 px-4 border-b border-gray-100"
            >
              <LucideLayoutDashboard size={20}></LucideLayoutDashboard>
              <span className="text-lg font-semibold">DashBoard</span>{" "}
            </Link>
          </div>
          {/* Logout Section */}
          <div className="p-2 border-t border-base-300">
            <button
              onClick={handleLogOut}
              className="btn btn-ghost w-full justify-start gap-3"
            >
              <LogOutIcon></LogOutIcon>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
