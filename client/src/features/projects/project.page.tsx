import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AppLayout } from '../../layout/app-layout';
import { TranslationsPage } from '../translations/translations.page';
import { ProjectOverview } from './project-overview';
import { Link } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const ProjectPage: React.FC = () => {
  const { path, url } = useRouteMatch();
  const mainListItems = (
    <List>
      <ListItem button component={Link} to={`${url}/overview`}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Overview" />
      </ListItem>
      <ListItem button component={Link} to={`${url}/translations`}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Translations" />
      </ListItem>
    </List>
  );

  return (
    <AppLayout listItems={mainListItems}>
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
