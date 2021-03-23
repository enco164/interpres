import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { AppLayout } from "../../layout/app-layout";
import { ImportExportPage } from "../import-export/import-export.page";
import { TranslationsPage } from "../translations/translations.page";
import { ProjectOverview } from "./project-overview";
import { ProjectSettingsPage } from "./project-settings.page";

export const ProjectPage: React.FC = () => {
  const { t } = useTranslation(["project"]);
  const { path, url } = useRouteMatch();
  const mainListItems = (
    <List>
      <ListItem button component={Link} to={`${url}/overview`}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu.overview")} />
      </ListItem>
      <ListItem button component={Link} to={`${url}/translations`}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu.translations")} />
      </ListItem>
      <ListItem button component={Link} to={`${url}/import-export`}>
        <ListItemIcon>
          <ImportExportIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu.import_export")} />
      </ListItem>
      <ListItem button component={Link} to={`${url}/settings`}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t("menu.settings")} />
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
        <Route path={`${path}/import-export`}>
          <ImportExportPage />
        </Route>
        <Route path={`${path}/settings`}>
          <ProjectSettingsPage />
        </Route>
      </Switch>
    </AppLayout>
  );
};
