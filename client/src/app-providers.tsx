import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>{children}</Router>
    </React.Fragment>
  );
};
