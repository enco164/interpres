import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const ProjectsList: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography>Your Interpres projects</Typography>
      <Link to="/project/1/overview">Project 1</Link>
    </Container>
  );
};
