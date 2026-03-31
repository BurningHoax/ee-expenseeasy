"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useAuth } from "@/contexts/auth-context";

interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: NavLink[];
  brandName?: string;
}

const defaultLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/split", label: "Split Tool" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
];

export function Navbar({
  links = defaultLinks,
  brandName = "ExpenseEasy",
}: NavbarProps) {
  const [isThemeReady, setIsThemeReady] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoading, isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsThemeReady(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              {brandName}
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-5">
            {/* Navigation Links */}
            <div className="hidden md:flex md:gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {!isLoading && isLoggedIn && user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="leading-tight">
                    <p className="max-w-28 truncate text-xs font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="max-w-28 truncate text-[10px] text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : !isLoading ? (
              <Link href="/login">
                <Button variant="outline" size="sm" className="gap-1">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            ) : null}

            {/* Dark Mode Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border border-border bg-card text-foreground shadow-sm"
            >
              {!isThemeReady ? (
                <span className="h-5 w-5" />
              ) : theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
