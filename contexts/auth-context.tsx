"use client";

import React, { useEffect, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = "expenseeasy-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { user: AuthUser };
        setUser(parsed.user);
        setIsLoggedIn(true);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with Supabase auth session later.
    if (!email || password.length < 6) {
      throw new Error("Invalid credentials");
    }

    const authUser: AuthUser = {
      name: email.split("@")[0],
      email,
    };

    setIsLoggedIn(true);
    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: authUser }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
