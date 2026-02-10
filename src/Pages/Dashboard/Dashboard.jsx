import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Home,
  User,
  PlusCircle,
  BookOpen,
  Bookmark,
  Settings,
  Menu,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="drawer lg:drawer-open bg-base-100">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-40 px-4">
            <div className="flex-1">
              <label
                htmlFor="my-drawer-4"
                className="btn btn-ghost btn-square lg:hidden"
              >
                <Menu size={22} />
              </label>
              {/* Breadcrumb or Page Title */}
              <div className="hidden sm:block text-sm breadcrumbs px-4">
                <ul>
                  <li>Dashboard</li>
                  <li className="font-semibold text-primary">Overview</li>
                </ul>
              </div>
            </div>

            {/* Navbar Right Side */}
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end ml-2">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-primary/20">
                    <img alt="User Profile" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
                >
                  <li>
                    <a>Profile Settings</a>
                  </li>
                  <li>
                    <a className="text-error">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main className="flex-1 p-6 md:p-8 max-w-400 mx-auto w-full">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-50">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <aside className="w-72 bg-base-200/50 border-r border-base-300 min-h-screen flex flex-col">
            {/* Logo Section */}
            <div className="p-6 mb-2 flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl text-primary-content">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Lifeledger
              </span>
            </div>

            <ul className="menu p-4 pt-0 gap-1 text-base-content flex-1">
              <li className="menu-title text-xs uppercase tracking-widest opacity-50 mt-4 mb-2">
                Main Menu
              </li>

              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <Home size={20} />
                  <span>Overview</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-lessons"
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <BookOpen size={20} />
                  <span>My Lessons</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/saved-lessons"
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <Bookmark size={20} />
                  <span>Favorites</span>
                </NavLink>
              </li>

              <li className="menu-title text-xs uppercase tracking-widest opacity-50 mt-6 mb-2">
                Management
              </li>

              <li>
                <NavLink
                  to="/dashboard/add-lessons"
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <PlusCircle size={20} />
                  <span>Add New Lesson</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <User size={20} />
                  <span>Profile</span>
                </NavLink>
              </li>
            </ul>

            {/* Footer Sidebar Section */}
            <div className="p-4 mt-auto border-t border-base-300">
              <button className="btn btn-ghost btn-block justify-start gap-3 hover:bg-error/10 hover:text-error transition-colors">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
