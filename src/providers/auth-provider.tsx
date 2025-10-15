"use client";

import { Auth, getAuth, signInAnonymously } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/types"; // Precisaremos do types.ts também
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  auth: Auth | null;
  login: (role: UserRole) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  login: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const router = useRouter();

  const login = async (role: UserRole) => {
    if (!auth) return;
    try {
      await signInAnonymously(auth);
      router.push(`/${role}/dashboard`); // Navegação dinâmica
    } catch (error) {
      console.error("Erro no login anônimo:", error);
    }
  };

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, []);

  if (!auth) {
    return null; 
  }

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
