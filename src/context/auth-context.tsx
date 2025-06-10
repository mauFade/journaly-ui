"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  name: string;
};

type UserData = User & {
  token: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  updateUserData: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setUser(null);

    // Limpar cookies
    Cookies.remove("user");
    Cookies.remove("userToken");

    router.push("/login");
  }, [router]);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      setIsLoading(true);
      try {
        const storedUser = Cookies.get("user");
        const accessToken = Cookies.get("userToken");

        if (storedUser && accessToken) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário do cookie:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, [logout]);

  const login = (user: UserData) => {
    setUser(user);
    Cookies.set("user", JSON.stringify({ email: user.email, name: user.name }));

    Cookies.remove("userToken");
    Cookies.set("userToken", user.token);
  };

  const updateUserData = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    Cookies.set("user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
