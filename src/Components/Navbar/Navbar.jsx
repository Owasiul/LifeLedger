import { Menu, Moon, Sun, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../assets/Logo.png";
import AvatarDropdown from "./AvatarDropdown/AvatarDropdown";
import useAuth from "../../Hooks/useAuth";
import { Button } from "@heroui/react";
import { useTheme } from "../../Hooks/useTheme.jsx";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Scroll effect for navbar background
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { 
      to: user ? "/dashboard/add-lessons" : "/auth/login", 
      label: "Add Lesson",
      requiresAuth: false // redirects appropriately based on user
    },
    { 
      to: user ? "/dashboard/my-lessons" : "/auth/login", 
      label: "My Lessons",
      requiresAuth: false
    },
    { 
      to: "/all-lessons", 
      label: "Public Lessons",
      requiresAuth: false
    },
    ...(user ? [{ to: "/pricing", label: "Pricing", requiresAuth: true }] : [])
  ];

  // Helper to get correct link based on user authentication
  const getNavLinkTo = (item) => {
    if (item.requiresAuth && !user) return "/auth/login";
    return item.to;
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${isScrolled 
            ? "bg-base-100/90 backdrop-blur-md shadow-lg" 
            : "bg-base-100 shadow-sm"
          }
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <NavLink to="/" className="shrink-0 transition-transform hover:scale-105">
                <img className="object-contain w-10 sm:w-12 md:w-16" src={Logo} alt="logo" />
              </NavLink>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
              <ul className="flex items-center gap-1 xl:gap-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={getNavLinkTo(item)}
                      className={({ isActive }) => `
                        relative px-4 py-2 text-sm xl:text-base font-medium rounded-lg
                        transition-all duration-200 ease-in-out
                        ${isActive 
                          ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50" 
                          : "text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30"
                        }
                      `}
                    >
                      {item.label}
                      {({ isActive }) => isActive && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full" />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle with Animation */}
              <button
                onClick={toggleTheme}
                className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <Sun
                    className={`
                      absolute inset-0 transition-all duration-300 rotate-0 scale-100
                      ${theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}
                    `}
                    size={20}
                  />
                  <Moon
                    className={`
                      absolute inset-0 transition-all duration-300
                      ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}
                    `}
                    size={20}
                  />
                </div>
              </button>

              {/* Auth Buttons or Avatar */}
              {user ? (
                <AvatarDropdown />
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    onClick={() => navigate("/auth/login")}
                    color="primary"
                    size="sm"
                    className="rounded-full px-4 sm:px-6 text-sm font-medium"
                    variant="light"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate("/auth/register")}
                    color="secondary"
                    size="sm"
                    className="rounded-full px-4 sm:px-6 text-sm font-medium shadow-sm"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 z-40
            lg:hidden
            ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu Panel */}
        <div
          ref={mobileMenuRef}
          className={`
            fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-base-100 shadow-2xl z-50
            transform transition-transform duration-300 ease-out lg:hidden
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <NavLink to="/" onClick={closeMobileMenu}>
                <img className="object-contain w-12" src={Logo} alt="logo" />
              </NavLink>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={getNavLinkTo(item)}
                      onClick={closeMobileMenu}
                      className={({ isActive }) => `
                        block px-4 py-3 rounded-xl text-base font-medium
                        transition-all duration-200
                        ${isActive 
                          ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/50" 
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Buttons (shown when not logged in) */}
              {!user && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <Button
                    onClick={() => {
                      navigate("/auth/login");
                      closeMobileMenu();
                    }}
                    color="primary"
                    fullWidth
                    className="rounded-xl font-medium"
                    variant="flat"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/auth/register");
                      closeMobileMenu();
                    }}
                    color="secondary"
                    fullWidth
                    className="rounded-xl font-medium"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;