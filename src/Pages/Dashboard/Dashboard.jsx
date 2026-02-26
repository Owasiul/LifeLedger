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
  HomeIcon,
  UserCircle2,
  BookText,
  Flag,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../assets/Logo.png";
import useRoles from "../../Hooks/useRoles";
const Dashboard = () => {
  const { role } = useRoles();
  const { user, LogOut: logout } = useAuth();
  const handleLogOut = () => {
    logout().catch((error) => console.log(error));
  };
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
                </ul>
              </div>
            </div>

            {/* Navbar Right Side */}
            <div className="flex-none gap-2">
              <div className="w-10">
                <img
                  className="rounded-full"
                  alt="User Profile"
                  src={user.photoURL}
                />
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

          <aside className="w-72 bg-base-100 border-r border-base-300 min-h-screen flex flex-col">
            {/* Logo Section */}
            <Link to="/" className="p-6 mb-2 flex items-center gap-3">
              <img className="w-20" src={Logo} alt="" />
            </Link>

            <ul className="menu p-4 pt-0 gap-1 text-base-content flex-1">
              <li className="menu-title text-xs uppercase tracking-widest opacity-50 mt-4 mb-2">
                Main Menu
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
                  to="/dashboard/my-favorites"
                  className={({ isActive }) =>
                    isActive
                      ? "active bg-primary/10 text-primary font-medium"
                      : "hover:bg-base-300"
                  }
                >
                  <Bookmark size={20} />
                  <span>Saved Lessons</span>
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

              {role === "admin" && (
                <>
                  <li className="menu-title text-xs uppercase tracking-widest opacity-50 mt-6 mb-2">
                    Admin Management
                  </li>
                  <li>
                    <NavLink to="/dashboard/admin-overview">
                      <HomeIcon />
                      <span>Admin Overview</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users-management">
                      <UserCircle2 />
                      <span>Users Management</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/lessons-management">
                      <BookText />
                      <span>Lessons Management</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reports-management">
                      <Flag />
                      <span>Reports Management</span>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            {/* Footer Sidebar Section */}
            <div className="p-4 mt-auto border-t border-base-300">
              <button
                onClick={handleLogOut}
                className="btn btn-ghost btn-block justify-start gap-3 hover:bg-error/10 hover:text-error transition-colors"
              >
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
