import { createContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const verifyToken = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch("/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } catch {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}