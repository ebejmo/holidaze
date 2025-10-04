import { useState, useMemo } from 'react';
import { AuthContext } from './AuthContext';

const getInitialState = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('accessToken');
  if (storedUser && storedToken) {
    return { user: JSON.parse(storedUser), accessToken: storedToken };
  }
  return { user: null, accessToken: null };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialState);

  const login = (userData, token) => {
    const authState = { user: userData, accessToken: token };
    setAuth(authState);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', token);
  };

  const logout = () => {
    const emptyState = { user: null, accessToken: null };
    setAuth(emptyState);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
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
