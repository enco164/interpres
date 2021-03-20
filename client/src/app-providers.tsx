import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "./config/theme";
import { store } from "./state/store";
import { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback="loading">
        <ReduxProvider store={store}>
          <CssBaseline />
          <Router>{children}</Router>
        </ReduxProvider>
      </Suspense>
    </ThemeProvider>
  );
};
