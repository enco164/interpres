import { Button, Container, Grid, TextField } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CreateProjectDto } from "../../api/dto/create-project.dto";
import { useAppDispatch } from "../../state/store";
import { createProject } from "./projects.slice";

interface NewProjectPageProps {}

export const NewProjectPage: React.FC<NewProjectPageProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSubmit = async (values: CreateProjectDto) => {
    try {
      const result = unwrapResult(await dispatch(createProject(values)));
      history.push(`/project/${result.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          name: "",
          githubOwner: "",
          githubRepo: "",
          lngLoadPath: "",
        }}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Grid container>
              <Grid xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label={t("project_name_input_label")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="githubOwner"
                  name="githubOwner"
                  label={t("project_githubOwner_input_label")}
                  value={formik.values.githubOwner}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  id="githubRepo"
                  name="githubRepo"
                  label={t("project_githubRepo_input_label")}
                  value={formik.values.githubRepo}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id="lngLoadPath"
                  name="lngLoadPath"
                  label={t("project_lngLoadPath_input_label")}
                  value={formik.values.lngLoadPath}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item>
                <Button type="submit">{t("create_project_button")}</Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
