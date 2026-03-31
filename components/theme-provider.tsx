"use client";

import React, { useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
  storageKey = "app-theme",
}: {
  children: ReactNode;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<Theme | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(storageKey, newTheme);

    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setThemeState(initialTheme);

    const root = document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [storageKey]);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    return {
      theme: null as Theme | null,
      setTheme: () => {},
    };
  }
  return context;
}
