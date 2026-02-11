import { Menu, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../../assets/Logo.png";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";
import useAuth from "../../Hooks/useAuth";
import "./CSS/Navbar.css";
const Navbar = () => {
  const { user } = useAuth();

  // theme
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  // nav items
  const navItems = (
    <div className="flex lg:flex-row flex-col lg:gap-0 gap-5">
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to={user ? `/dashboard/add-lessons` : "/auth/login"}>
          Add Lesson
        </NavLink>
      </li>
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to={user ? `/dashboard/my-lessons` : "/auth/login"}>
          My Lessons
        </NavLink>
      </li>
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to="/all-lessons">Public Lessons</NavLink>
      </li>
      {user && (
        <>
          {" "}
          <li className="text-lg text-content font-medium hover:text-violet-400">
            <NavLink to="/pricing">Pricing</NavLink>
          </li>{" "}
        </>
      )}
    </div>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-4">
        {/* LEFT SIDE */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown block">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu className="w-5 h-5" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <NavLink to="/" className="">
            <img className="object-contain w-20" src={Logo} alt="logo" />
          </NavLink>
        </div>

        {/* CENTER (Desktop Only) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end flex items-center gap-3">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />

            {/* Light Mode Icon */}
            <Moon className="swap-off w-5 h-5" />

            {/* Dark Mode Icon */}
            <Sun className="swap-on w-5 h-5" />
          </label>

          {user ? (
            <AvatarDropdown />
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn btn-sm md:btn-md bg-[#4F46E5] hover:bg-[#4338CA] text-white"
              >
                Sign In
              </Link>

              <Link
                to="/auth/register"
                className="btn btn-sm md:btn-md bg-accent hover:bg-sky-600 text-white"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
