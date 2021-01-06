import {
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects, selectAllProjects } from "../../state/projects.slice";
import { useAppDispatch } from "../../state/store";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const ProjectsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const projects = useSelector(selectAllProjects);

  useEffect(() => {
    const fetchPromise = dispatch(fetchProjects());
    return () => {
      fetchPromise.abort();
    };
  }, [dispatch]);

  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1">Your Interpres projects</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Add project
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {projects.map((project) => (
          <Grid key={project.id} item xs={12} sm={6} lg={3}>
            <Link to={`/project/${project.id}/overview`}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {project.name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
