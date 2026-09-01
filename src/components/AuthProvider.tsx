"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/lib/api/auth";

type AuthValue = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (user: AuthUser | string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trecom_auth");
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        setUser(parsed);
        setIsLoggedIn(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const login = (input: AuthUser | string) => {
    const u: AuthUser =
      typeof input === "string"
        ? { id: "local", name: input.trim() || "Member" }
        : { ...input, name: input.name?.trim() || "Member" };
    localStorage.setItem("trecom_auth", JSON.stringify(u));
    setUser(u);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("trecom_auth");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
