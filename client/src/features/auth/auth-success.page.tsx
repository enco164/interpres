import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";
import { FROM_STATE_KEY } from "./constants";

interface AuthSuccessPageProps {}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const AuthSuccessPage: React.FC<AuthSuccessPageProps> = () => {
  const query = useQuery();
  const history = useHistory();
  const accessToken = query.get("accessToken");
  const { login, logout } = useAuth();

  useEffect(() => {
    if (accessToken) {
      login(accessToken);

      const from = localStorage.getItem(FROM_STATE_KEY);
      let path = "/";
      if (from) {
        path = JSON.parse(from).pathname;
      }
      history.replace(path);
    } else {
      logout();
    }
  }, [accessToken, login, logout, history]);

  return null;
};
