import { Button, Container, TextField, Typography } from "@material-ui/core";
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
              <TextField
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                label={"Name"}
              />
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Container>
  );
};
