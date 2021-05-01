import React from "react";
import { Route, Switch } from "react-router-dom";
import { AppProviders } from "./app-providers";
import "./App.css";
import { NewProjectPage } from "./features/projects/new-project.page";
import { ProjectPage } from "./features/projects/project.page";
import { ProjectsList } from "./features/projects/projects-list";
import { AuthSuccessPage } from "./features/auth/auth-success.page";
import { PrivateRoute } from "./features/auth/private-route";
import { LoginPage } from "./features/auth/login.page";

function App() {
  return (
    <AppProviders>
      <Switch>
        <Route path="/" exact>
          <ProjectsList />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/auth/success">
          <AuthSuccessPage />
        </Route>
        <PrivateRoute path="/project/new" exact>
          <NewProjectPage />
        </PrivateRoute>
        <PrivateRoute path="/project/:projectId">
          <ProjectPage />
        </PrivateRoute>
      </Switch>
    </AppProviders>
  );
}

export default App;
