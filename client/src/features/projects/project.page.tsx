import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { AppLayout } from "../../layout/app-layout";
import { ImportExportPage } from "../import-export/import-export.page";
import { TranslationsPage } from "../translations/translations.page";
import { ProjectOverview } from "./project-overview";
import { Link } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ImportExportIcon from "@material-ui/icons/ImportExport";

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
      </Switch>
    </AppLayout>
  );
};
