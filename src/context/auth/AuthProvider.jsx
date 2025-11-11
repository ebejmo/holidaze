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

/**
 * Provides authentication state and actions throughout the application.
 *
 * Handles storing, retrieving, and clearing user data and tokens using localStorage.
 * Exposes login/logout methods and authentication flags via React Context.
 *
 * @component
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components that will have access to the authentication context.
 * @returns {JSX.Element} The context provider wrapping the app.
 *
 * @example
 * // Example: wrapping the entire app in the provider
 * import { AuthProvider } from './context/auth/AuthProvider';
 *
 * function App() {
 *   return (
 *     <AuthProvider>
 *       <AppRoutes />
 *     </AuthProvider>
 *   );
 * }
 *
 * @context
 * Provides the following values:
 * - `user` {Object|null} - The authenticated user object, or `null` if not logged in.
 * - `accessToken` {string|null} - The access token for API requests.
 * - `isAuthenticated` {boolean} - Whether the user is currently authenticated.
 * - `isManager` {boolean} - Whether the user has venue manager privileges.
 * - `login(apiResult)` {Function} - Stores user and token to state and localStorage.
 * - `logout()` {Function} - Clears user and token from state and localStorage.
 */
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
