import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  PlusCircle,
  BookOpen,
  Bookmark,
  User,
  LogOut,
  HomeIcon,
  UserCircle2,
  BookText,
  Flag,
  House,
  Menu,
  Edit3,
  FileText,
  Heart,
  LayoutDashboard,
  BookOpenText,
  BookmarkCheck,
  UserPlus,
  Settings,
  Users,
  FileCheck,
  FlagTriangleRight,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../assets/Logo.png";
import useRoles from "../../Hooks/useRoles";
import DashboardNavbar from "./Dashboard_Components/DashboardNavbar";
import StatsChart from "./Dashboard_Components/StatsChart";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "#/Components/ui/sidebar.jsx";
import { Button } from "#/Components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/Components/ui/dropdown-menu.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/Components/ui/avatar.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "#/Components/ui/tooltip.jsx";
import { Separator } from "#/Components/ui/separator.jsx";
import { ScrollArea } from "#/Components/ui/scroll-area.jsx";
import { cn } from "#/lib/utils";

// Custom hook to fetch user lesson stats (mock implementation - replace with your API call)
const useLessonStats = (userId) => {
  const [stats, setStats] = useState({
    lessonsCreated: 0,
    lessonsSaved: 0,
    publicLessons: [],
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    // Simulate API call - replace with your actual data fetching logic
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Example API call: const response = await fetch(`/api/users/${userId}/stats`);
        // const data = await response.json();

        // Mock data for demonstration
        const mockStats = {
          lessonsCreated: 0,
          lessonsSaved: 0,
          publicLessons: [], // Array of public lesson objects
          totalViews: 0,
        };
        setStats(mockStats);
      } catch (error) {
        console.error("Failed to fetch lesson stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, loading };
};

const Dashboard = () => {
  const { role } = useRoles();
  const { user, LogOut: logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { stats: lessonStats, loading: statsLoading } = useLessonStats(
    user?.uid,
  );

  const handleLogOut = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Helper for building NavLink className
  const navLinkClass = ({ isActive }) =>
    cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    );

  // Menu items configuration
  const mainMenuItems = [
    { to: "/dashboard/overview", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/my-lessons", icon: BookOpenText, label: "My Lessons" },
    { to: "/dashboard/my-favorites", icon: BookmarkCheck, label: "Saved Lessons" },
  ];

  const managementItems = [
    { to: "/dashboard/add-lessons", icon: UserPlus, label: "Add New Lesson" },
    { to: "/dashboard/profile", icon: Settings, label: "Profile" },
  ];

  const adminItems = [
    {
      to: "/dashboard/admin-overview",
      icon: LayoutDashboard,
      label: "Admin Overview",
    },
    {
      to: "/dashboard/users-management",
      icon: Users,
      label: "Users Management",
    },
    {
      to: "/dashboard/lessons-management",
      icon: FileCheck,
      label: "Lessons Management",
    },
    {
      to: "/dashboard/reports-management",
      icon: FlagTriangleRight,
      label: "Reports Management",
    },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("overview")) return "Overview";
    if (path.includes("my-lessons")) return "My Lessons";
    if (path.includes("my-favorites")) return "Saved Lessons";
    if (path.includes("add-lessons")) return "Add New Lesson";
    if (path.includes("profile")) return "Profile";
    if (path.includes("admin-overview")) return "Admin Overview";
    if (path.includes("users-management")) return "Users Management";
    if (path.includes("lessons-management")) return "Lessons Management";
    if (path.includes("reports-management")) return "Reports Management";
    return "Dashboard";
  };

  const isOverviewPage =
    location.pathname === "/dashboard/overview" ||
    location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <TooltipProvider delayDuration={0}>
        <div className="group/sidebar-wrapper flex min-h-svh w-full bg-sidebar">
          <Sidebar
            side="left"
            variant="sidebar"
            collapsible="icon"
            className="border-r border-sidebar-border"
          >
            <SidebarHeader>
              <Link
                to="/"
                className="flex items-center gap-2 px-2 py-3"
                onClick={() => {
                  // Close sidebar on mobile if needed
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <img className="w-6 h-6 object-contain" src={Logo} alt="Logo" />
                </div>
                <span className="text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  LearnHub
                </span>
              </Link>
            </SidebarHeader>

            <SidebarContent>
              <ScrollArea className="flex-1">
                <SidebarGroup>
                  <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {mainMenuItems.map((item) => (
                        <SidebarMenuItem key={item.to}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) => navLinkClass({ isActive })}
                          >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </NavLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Management</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {managementItems.map((item) => (
                        <SidebarMenuItem key={item.to}>
                          <NavLink
                            to={item.to}
                            className={({ isActive }) => navLinkClass({ isActive })}
                          >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                          </NavLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {role?.toLowerCase() === "admin" && (
                  <>
                    <SidebarGroup>
                      <SidebarGroupLabel>Admin Management</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {adminItems.map((item) => (
                            <SidebarMenuItem key={item.to}>
                              <NavLink
                                to={item.to}
                                className={({ isActive }) => navLinkClass({ isActive })}
                              >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                              </NavLink>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </>
                )}
              </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
              <SidebarSeparator />
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL} alt={user?.displayName || "User avatar"} />
                  <AvatarFallback className="text-xs font-semibold text-primary">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-sidebar-foreground">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-sidebar-foreground/60 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 px-2 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors mx-2"
              >
                <Settings size={16} />
                <span>Edit Profile</span>
              </Link>
              <button
                onClick={handleLogOut}
                className="flex w-full items-center gap-2 px-2 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-error rounded-md transition-colors mx-2"
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </SidebarFooter>
          </Sidebar>

          <SidebarRail />

          <SidebarInset>
            <DashboardNavbar user={user} getPageTitle={getPageTitle} handleLogOut={handleLogOut} />

            <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-7xl">
                {/* Page Header */}
                <div className="mb-8">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {getPageTitle()}
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Welcome back, {user?.displayName || "User"}!
                  </p>
                </div>

                {/* Overview Page Specific Content */}
                {isOverviewPage && (
                  <div className="space-y-8">
                    {/* Profile Header Card */}
                    <div className="rounded-2xl border border-border bg-linear-to-r from-primary/5 via-background to-secondary/5 p-6 shadow-sm transition-all hover:shadow-md">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary/10">
                            {user?.photoURL ? (
                              <img
                                className="h-full w-full object-cover"
                                alt={user?.displayName || "User avatar"}
                                referrerPolicy="no-referrer"
                                src={user.photoURL}
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <span className="text-2xl font-bold text-primary">
                                  {user?.email?.[0]?.toUpperCase() || "U"}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-foreground">
                              {user?.displayName || "User"}
                            </h2>
                            <p className="text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                        <Link
                          to="/dashboard/profile"
                          className="btn btn-outline btn-sm gap-2 self-start md:self-auto"
                        >
                          <Edit3 size={16} />
                          Edit Profile
                        </Link>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Lessons Created</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                              {statsLoading ? (
                                <span className="loading loading-dots loading-sm"></span>
                              ) : (
                                lessonStats.lessonsCreated
                              )}
                            </p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FileText size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Lessons Saved</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                              {statsLoading ? (
                                <span className="loading loading-dots loading-sm"></span>
                              ) : (
                                lessonStats.lessonsSaved
                              )}
                            </p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                            <Heart size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Public Lessons</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                              {lessonStats.publicLessons?.length || 0}
                            </p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                            <BookOpen size={24} />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                            <p className="text-3xl font-bold text-foreground mt-1">
                              {lessonStats.totalViews || 0}
                            </p>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                            <BookOpenText size={24} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity Chart */}
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Activity Overview</h3>
                        <p className="text-sm text-muted-foreground">Your lesson creation and view trends over the last 6 months</p>
                      </div>
                      <StatsChart type="area" />
                    </div>

                    {/* My Public Lessons Section */}
                    <div className="rounded-2xl border border-border bg-card shadow-sm">
                      <div className="border-b border-border bg-card px-6 py-4">
                        <h3 className="text-lg font-semibold text-foreground">
                          My Public Lessons ({lessonStats.publicLessons?.length || 0})
                        </h3>
                      </div>
                      <div className="p-6">
                        {lessonStats.publicLessons?.length === 0 && (
                          <div className="py-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                              <BookOpen size={28} className="text-muted-foreground/40" />
                            </div>
                            <p className="text-muted-foreground">
                              You have no public lessons yet. Create one and set its
                              visibility to public.
                            </p>
                            <Link
                              to="/dashboard/add-lessons"
                              className="btn btn-primary btn-sm mt-4 gap-2"
                            >
                              <PlusCircle size={16} />
                              Create New Lesson
                            </Link>
                          </div>
                        )}
                        {/* If there are public lessons, map them here */}
                        {lessonStats.publicLessons?.length > 0 && (
                          <div className="space-y-3">
                            {lessonStats.publicLessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
                              >
                                <div>
                                  <h4 className="font-medium text-foreground">{lesson.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.description?.slice(0, 100)}
                                  </p>
                                </div>
                                <ChevronRightIcon size={18} className="text-muted-foreground/40" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Render nested routes for non-overview pages */}
                {!isOverviewPage && <Outlet />}
              </div>
            </main>
          </SidebarInset>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default Dashboard;