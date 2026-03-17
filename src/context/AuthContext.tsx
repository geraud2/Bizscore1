import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  activity: string;
  location: string;
  score: number;
  revenue: number;
  salesCount: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: Omit<User, "id" | "score" | "revenue" | "salesCount"> & { password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "bizscore_user";
const USERS_KEY = "bizscore_users";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const getUsers = (): Array<User & { password: string }> => {
    try {
      const saved = localStorage.getItem(USERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users: Array<User & { password: string }>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _pw, ...userWithoutPw } = found;
      setUser(userWithoutPw);
      return true;
    }
    return false;
  };

  const register = (data: Omit<User, "id" | "score" | "revenue" | "salesCount"> & { password: string }): boolean => {
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) return false;
    const newUser: User & { password: string } = {
      ...data,
      id: crypto.randomUUID(),
      score: Math.floor(Math.random() * 30) + 55, // 55-85 initial score
      revenue: 1200000,
      salesCount: 142,
    };
    users.push(newUser);
    saveUsers(users);
    const { password: _pw, ...userWithoutPw } = newUser;
    setUser(userWithoutPw);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
