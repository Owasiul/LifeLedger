import { LogOut, Menu, User, Settings, Moon, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { SidebarTrigger, useSidebar } from "#/Components/ui/sidebar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "#/Components/ui/dropdown-menu.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/Components/ui/avatar.jsx";
import { Button } from "#/Components/ui/button.jsx";
import { useTheme } from "#/Hooks/useTheme.jsx";

const DashboardNavbar = ({ user, getPageTitle, handleLogOut }) => {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4 px-4">
        <SidebarTrigger
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </SidebarTrigger>

        <nav className="flex-1 flex items-center gap-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-sm">
            <li className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard/
              </Link>
            </li>
            <li className="flex items-center gap-1 text-foreground font-medium">
              {getPageTitle()}
            </li>
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5">
              <Sun
                className={`absolute inset-0 transition-all duration-300 rotate-0 scale-100 ${
                  theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`}
                size={20}
              />
              <Moon
                className={`absolute inset-0 transition-all duration-300 ${
                  theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`}
                size={20}
              />
            </div>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="User menu">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.photoURL} alt={user?.displayName || "User avatar"} />
                  <AvatarFallback className="text-sm font-semibold text-primary">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none truncate">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile" className="flex h-full w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="text-error focus:text-error"
                inset
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
