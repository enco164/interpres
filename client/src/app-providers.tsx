import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./state/store";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <CssBaseline />
      <Router>{children}</Router>
    </ReduxProvider>
  );
};
