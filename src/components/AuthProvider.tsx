"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type User = { name: string; phone?: string };

type AuthValue = {
  isLoggedIn: boolean;
  user: User | null;
  login: (name?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("trecom_auth");
      if (raw) {
        setUser(JSON.parse(raw));
        setIsLoggedIn(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const login = (name?: string) => {
    const u = { name: name?.trim() || "Member" };
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
