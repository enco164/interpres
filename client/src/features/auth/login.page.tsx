import React from "react";
import { useLocation } from "react-router-dom";
import { FROM_STATE_KEY } from "./constants";

interface LoginPageProps {}

export const LoginPage: React.FC<LoginPageProps> = () => {
  const location = useLocation<{ from: { pathname: string } }>();

  const { from } = location.state || { from: { pathname: "/" } };
  localStorage.setItem(FROM_STATE_KEY, JSON.stringify(from));
  window.location.href = "/api/auth/github";

  return null;
};
