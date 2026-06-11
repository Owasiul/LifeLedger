import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import {
  LogOutIcon,
  LucideLayoutDashboard,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import useUser from "../../../Hooks/useUser";
import { Button, Avatar } from "@heroui/react";

const AvatarDropdown = () => {
  const { user, LogOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { userData } = useUser();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const handleLogOut = async () => {
    try {
      await LogOut();
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <div className="relative">
      {/* Avatar Trigger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:ring-2 hover:ring-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user?.photoURL ? (
          <img
            referrerPolicy="no-referrer"
            src={user.photoURL}
            alt={`${user.displayName || "User"}'s avatar`}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            {getInitials()}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Avatar
                size="md"
                className="shrink-0"
                src={user?.photoURL}
                alt={user?.displayName || "User avatar"}
                fallback={getInitials()}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                  {user?.displayName || "User"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
              {userData?.isPremium && (
                <span className="text-xl" title="Premium Member">
                  ⭐
                </span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard");
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              role="menuitem"
            >
              <LucideLayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/dashboard/profile");
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              role="menuitem"
            >
              <User size={18} />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/settings");
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              role="menuitem"
            >
              <Settings size={18} />
              <span>Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/help");
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              role="menuitem"
            >
              <HelpCircle size={18} />
              <span>Help Center</span>
            </button>
          </div>

          {/* Logout Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 py-1">
            <button
              onClick={handleLogOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
              role="menuitem"
            >
              <LogOutIcon size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
