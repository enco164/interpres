import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AppLayout } from '../../layout/app-layout';
import { TranslationsPage } from '../translations/translations.page';
import { ProjectOverview } from './project-overview';

export const ProjectPage: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <AppLayout>
      <Switch>
        <Route path={`${path}/overview`}>
          <ProjectOverview />
        </Route>
        <Route path={`${path}/translations`}>
          <TranslationsPage />
        </Route>
      </Switch>
    </AppLayout>
  );
};
