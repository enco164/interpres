import { Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";
import { TestConnectionResult } from "../../domain/test-connection-result";

interface TestConnectionResultAlertProps {
  testConnectionResult: TestConnectionResult;
}

export const TestConnectionResultAlert: React.FC<TestConnectionResultAlertProps> = ({
  testConnectionResult,
}) => {
  const severity =
    testConnectionResult?.repoExists && testConnectionResult?.appInstalled
      ? "success"
      : "error";

  return (
    <Alert severity={severity}>
      <AlertTitle>Error</AlertTitle>
      <>
        <Typography>
          Project exist:{" "}
          {testConnectionResult?.repoExists ? (
            <CheckIcon fontSize="inherit" />
          ) : (
            <ClearIcon fontSize="inherit" />
          )}
        </Typography>
        <Typography>
          Interpres app installed on GitHub Repo:{" "}
          {testConnectionResult?.appInstalled ? (
            <CheckIcon fontSize="inherit" />
          ) : (
            <ClearIcon fontSize="inherit" />
          )}
        </Typography>
        <Typography>
          Found languages:{" "}
          {testConnectionResult?.foundLanguages ? (
            JSON.stringify(testConnectionResult?.foundLanguages)
          ) : (
            <ClearIcon fontSize="inherit" />
          )}
        </Typography>
      </>
    </Alert>
  );
};
