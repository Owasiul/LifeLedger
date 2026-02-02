import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "./Navbar.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const navItems = (
    <div className="flex lg:flex-row flex-col">
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
      </li>
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
      </li>
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to="/lessons">Public Lessons</NavLink>
      </li>
      <li className="text-lg text-content font-medium hover:text-violet-400">
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
    </div>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <NavLink to="/">
            <img className="object-contain w-20" src={Logo} alt="" />{" "}
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex flex-row gap-3">
          {/* Theme toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <svg className="swap-off w-5 h-5" viewBox="0 0 24 24">
              <Moon></Moon>
            </svg>
            <svg className="swap-on w-5 h-5" viewBox="0 0 24 24">
              <Sun></Sun>
            </svg>
          </label>

          <button className="btn bg-[#4F46E5] hover:bg-[#4338CA] text-white">
            Sign In
          </button>
          <button className="btn bg-none border-2 border-[#CBD5E1] text-[#1E293B] hover:border-[#F1F5F9]">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
