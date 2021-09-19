import {
  Button,
  Collapse,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Formik } from "formik";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { CreateProjectDto } from "../../api/dto/create-project.dto";
import { TestConnectionResultAlert } from "../../components";
import { TestConnectionResult } from "../../domain/test-connection-result";
import { useAppDispatch } from "../../state/store";
import { allLngs, mapLngCodeToLngOption } from "../../util";
import { createProject, testConnection } from "./projects.slice";

interface NewProjectPageProps {}

export const NewProjectPage: React.FC<NewProjectPageProps> = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [testConnectionResult, setTestConnectionResult] = useState<
    TestConnectionResult | "ERROR" | null
  >(null);

  const onSubmit = useCallback(
    async (values: CreateProjectDto) => {
      try {
        const result = unwrapResult(await dispatch(createProject(values)));
        history.push(`/project/${result.id}`);
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, history]
  );

  const onTestConnection = useCallback(
    async (values: CreateProjectDto) => {
      setTestConnectionResult(null);
      try {
        const result = unwrapResult(await dispatch(testConnection(values)));
        setTestConnectionResult(result);
      } catch (e) {
        setTestConnectionResult("ERROR");
      }
    },
    [dispatch]
  );

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={{
          name: "",
          githubOwner: "",
          githubRepo: "",
          lngLoadPath: "",
          languages: [],
        }}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label={t("project_name_input_label")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6} container direction={"column"}>
                <TextField
                  id="githubOwner"
                  name="githubOwner"
                  label={t("project_githubOwner_input_label")}
                  value={formik.values.githubOwner}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6} container direction={"column"}>
                <TextField
                  id="githubRepo"
                  name="githubRepo"
                  label={t("project_githubRepo_input_label")}
                  value={formik.values.githubRepo}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} container direction={"column"}>
                <TextField
                  id="lngLoadPath"
                  name="lngLoadPath"
                  label={t("project_lngLoadPath_input_label")}
                  value={formik.values.lngLoadPath}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12} container direction="column">
                <Autocomplete
                  multiple
                  autoComplete
                  autoHighlight
                  autoSelect
                  clearOnBlur
                  options={allLngs}
                  getOptionLabel={(option) => `${option.name} (${option.code})`}
                  defaultValue={[]}
                  filterSelectedOptions
                  getOptionSelected={(option, value) =>
                    option.code === value.code
                  }
                  onChange={(event, value) => {
                    formik.setFieldValue(
                      "languages",
                      value?.map((opt) => opt.code),
                      true
                    );
                  }}
                  value={
                    formik.values.languages?.map(mapLngCodeToLngOption) || []
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="languages"
                      variant="standard"
                      label={t("project_languages_input_label")}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Collapse in={Boolean(testConnectionResult)}>
                  {testConnectionResult && testConnectionResult !== "ERROR" && (
                    <TestConnectionResultAlert
                      testConnectionResult={testConnectionResult}
                    />
                  )}
                  {testConnectionResult && testConnectionResult === "ERROR" && (
                    <Alert severity="error">Server error</Alert>
                  )}
                </Collapse>
              </Grid>
              <Grid item xs={12} container spacing={2} justify="flex-end">
                <Grid item>
                  <Button
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={() => onTestConnection(formik.values)}
                  >
                    {t("test_connection")}
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    {t("create_project_button")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
