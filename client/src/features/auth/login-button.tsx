import React from "react";
import { Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

interface LoginButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = () => {
  const location = useLocation();
  return (
    <Button
      variant="outlined"
      color="secondary"
      component={Link}
      to={{
        pathname: "/login",
        state: { from: location },
      }}
    >
      Login
    </Button>
  );
};
