import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { theme } from "./config/theme";
import { store } from "./state/store";
import { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./features/auth/use-auth";

export const AppProviders: React.FC = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Suspense fallback="loading">
            <CssBaseline />
            <Router>{children}</Router>
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  );
};
