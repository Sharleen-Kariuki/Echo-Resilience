import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, getAuthToken, setAuthToken } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    api
      .me()
      .then((profile) => {
        if (isMounted) setUser(profile);
      })
      .catch(() => {
        if (isMounted) setAuthToken(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password, remember = true) => {
    const result = await api.login({ email, password });
    setAuthToken(result.token, remember);
    setUser(result.user);
    return result.user;
  }, []);

  const register = useCallback(
    async (body, remember = true) => {
      await api.register(body);
      return login(body.email, body.password, remember);
    },
    [login],
  );

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
