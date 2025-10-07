import { useState, useMemo } from 'react';
import { AuthContext } from './AuthContext';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

const getInitialState = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (storedUser && storedToken) {
    return { user: JSON.parse(storedUser), accessToken: storedToken };
  }
  return { user: null, token: null };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialState);

  const login = (apiResult) => {
    // const authState = { user: userData, accessToken: token };
    // setAuth(authState);
    // localStorage.setItem('user', JSON.stringify(userData));
    // localStorage.setItem('accessToken', token);
    const token = apiResult.accessToken;
    const userData = apiResult;

    const authState = { user: userData, token };
    setAuth(authState);

    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    const emptyState = { user: null, token: null };
    setAuth(emptyState);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = useMemo(
    () => ({
      ...auth,
      login,
      logout,
      isAuthenticated: !!auth.user && !!auth.token,
      isManager: !!auth.user?.venueManager,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
