import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Project } from "../../domain/project";
import { useProjectIdParam } from "../../hooks/use-project-id-param";
import { RootState, useAppDispatch } from "../../state/store";
import { allLngs, mapLngCodeToLngOption } from "../../util";
import {
  fetchProjectById,
  selectProjectById,
  updateProject,
} from "./projects.slice";

interface ProjectSettingsPageProps {}

export const ProjectSettingsPage: React.FC<ProjectSettingsPageProps> = () => {
  const { t } = useTranslation(["project-settings"]);
  const dispatch = useAppDispatch();
  const projectId = useProjectIdParam();
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const promise = dispatch(fetchProjectById({ id: projectId }));

    return () => {
      promise.abort();
    };
  }, [dispatch, projectId]);

  const handleSubmit = useCallback(
    async (values: Project) => {
      try {
        await dispatch(updateProject(values));
        setSnackbarOpen(true);
      } catch (e) {}
    },
    [dispatch]
  );

  const handleSnackbarClose = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  if (!project) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {t("title")}
      </Typography>
      {project && (
        <Formik initialValues={project} onSubmit={handleSubmit}>
          {(formik) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    label={t("formLabels.name")}
                  />
                </Grid>
                <Grid item xs={6} container direction="column">
                  <TextField
                    id="githubOwner"
                    name="githubOwner"
                    value={formik.values.githubOwner}
                    onChange={formik.handleChange}
                    label={t("formLabels.owner")}
                  />
                </Grid>
                <Grid item xs={6} container direction="column">
                  <TextField
                    id="githubRepo"
                    name="githubRepo"
                    value={formik.values.githubRepo}
                    onChange={formik.handleChange}
                    label={t("formLabels.repo")}
                  />
                </Grid>
                <Grid item xs={12} container direction="column">
                  <TextField
                    id="lngLoadPath"
                    name="lngLoadPath"
                    value={formik.values.lngLoadPath}
                    onChange={formik.handleChange}
                    label={t("formLabels.lngLoadPath")}
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
                    getOptionLabel={(option) =>
                      `${option.name} (${option.code})`
                    }
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
                        label={t("formLabels.languages")}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box p={2} textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  {t("formLabels.saveBtn")}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={t("savedSnackbarLabel")}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};
