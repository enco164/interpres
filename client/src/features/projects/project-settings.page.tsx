import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Project } from "../../domain/project";
import { useProjectIdParam } from "../../hooks/use-project-id-param";
import { RootState, useAppDispatch } from "../../state/store";
import {
  fetchProjects,
  selectProjectById,
  updateProject,
} from "./projects.slice";

interface ProjectSettingsPageProps {}

export const ProjectSettingsPage: React.FC<ProjectSettingsPageProps> = () => {
  const dispatch = useAppDispatch();
  const projectId = useProjectIdParam();
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  useEffect(() => {
    const promise = dispatch(fetchProjects());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const handleSubmit = useCallback(
    (values: Project) => {
      try {
        dispatch(updateProject(values));
      } catch (e) {}
    },
    [dispatch]
  );

  if (!project) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Settings
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
                    label={"Name"}
                  />
                </Grid>
                <Grid item xs={6} container direction="column">
                  <TextField
                    id="githubOwner"
                    name="githubOwner"
                    value={formik.values.githubOwner}
                    onChange={formik.handleChange}
                    label={"Owner"}
                  />
                </Grid>
                <Grid item xs={6} container direction="column">
                  <TextField
                    id="githubRepo"
                    name="githubRepo"
                    value={formik.values.githubRepo}
                    onChange={formik.handleChange}
                    label={"Repo"}
                  />
                </Grid>
                <Grid item xs={12} container direction="column">
                  <TextField
                    id="lngLoadPath"
                    name="lngLoadPath"
                    value={formik.values.lngLoadPath}
                    onChange={formik.handleChange}
                    label={"Lng Load Path"}
                  />
                </Grid>
              </Grid>
              <Box p={2}>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};
