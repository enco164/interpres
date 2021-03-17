import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./state/store";
import { Suspense } from "react";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <Suspense fallback="loading">
      <ReduxProvider store={store}>
        <CssBaseline />
        <Router>{children}</Router>
      </ReduxProvider>
    </Suspense>
  );
};
