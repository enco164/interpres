import React from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "./use-auth";
import { useHistory } from "react-router-dom";

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const { logout } = useAuth();
  const history = useHistory();
  return (
    <Button
      variant="outlined"
      onClick={() => {
        logout();
        history.push("/");
      }}
    >
      Sign out
    </Button>
  );
};
