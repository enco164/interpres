import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { ACCESS_TOKEN_KEY } from "./constants";
import {
  fetchUserProfile,
  loginWithWithToken,
  selectAuthenticated,
  selectAuthSlice,
  logout as logoutAction,
} from "./auth.slice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../state/store";

const authContext = createContext<AuthProviderValue>({
  authenticated: false,
  logout: () => {},
  login: () => {},
  user: null,
});

export const useAuth = () => useContext(authContext);

interface AuthProviderValue {
  authenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: any | null;
}

const useAuthProvider = (): AuthProviderValue => {
  const dispatch = useAppDispatch();
  const authenticated = useSelector(selectAuthenticated);
  const { user } = useSelector(selectAuthSlice);

  const login = useCallback(
    (token: string) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      dispatch(loginWithWithToken(token));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUserProfile());
    }
  }, [authenticated, dispatch]);

  return { authenticated, login, logout, user };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
