import { useState, useMemo } from 'react';
import { AuthContext } from './AuthContext';

const USER_KEY = 'user';
const TOKEN_KEY = 'accessToken';

const getInitialState = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedUser && storedToken) {
    return { user: JSON.parse(storedUser), accessToken: storedToken };
  }
  return { user: null, accessToken: null };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialState);

  const login = (apiResult) => {
    const { accessToken, ...userData } = apiResult;
    const authState = { user: userData, accessToken };
    setAuth(authState);

    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, accessToken);
  };

  const logout = () => {
    const emptyState = { user: null, accessToken: null };
    setAuth(emptyState);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = useMemo(
    () => ({
      ...auth,
      login,
      logout,
      isAuthenticated: !!auth.user && !!auth.accessToken,
      isManager: !!auth.user?.venueManager,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
