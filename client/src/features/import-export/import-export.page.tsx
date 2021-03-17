import { Grid, Typography } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { useProjectIdParam } from "../../hooks/use-project-id-param";
import { useAppDispatch } from "../../state/store";
import { ExportForm } from "./export-form";
import { exportTranslations, importTranslations } from "./import-export.slice";
import { ImportForm } from "./import-form";

interface ImportExportPageProps {}

export const ImportExportPage: React.FC<ImportExportPageProps> = () => {
  const projectId = useProjectIdParam();
  const dispatch = useAppDispatch();
  const handleImportTranslations = useCallback(
    async (values: { lang: string; file: File | null }) => {
      try {
        const result = unwrapResult(
          await dispatch(
            importTranslations({ ...values, projectId: +projectId })
          )
        );
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, projectId]
  );

  const handleExport = useCallback(
    async (values: { lang: string }) => {
      try {
        const result = unwrapResult(
          await dispatch(
            exportTranslations({ lang: values.lang, projectId: +projectId })
          )
        );
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, projectId]
  );

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6" component="h6">
          Import translations
        </Typography>
        <ImportForm onSubmit={handleImportTranslations} />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" component="h6">
          Export translations
        </Typography>
        <ExportForm onSubmit={handleExport} />
      </Grid>
    </Grid>
  );
};
