import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppProviders } from './app-providers';
import './App.css';
import { ProjectPage } from './features/projects/project.page';
import { ProjectsList } from './features/projects/projects-list';

function App() {
  return (
    <AppProviders>
      <Switch>
        <Route path="/" exact>
          <ProjectsList />
        </Route>
        <Route path="/project/:projectId">
          <ProjectPage />
        </Route>
      </Switch>
    </AppProviders>
  );
}

export default App;
