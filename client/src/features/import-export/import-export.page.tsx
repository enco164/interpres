import { Box, Button, Grid, Typography } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Confirm } from "../../components";
import { useProjectIdParam } from "../../hooks/use-project-id-param";
import { useAppDispatch } from "../../state/store";
import { ExportForm } from "./export-form";
import {
  exportTranslations,
  selectIsImportingTranslations,
} from "./import-export.slice";
import { useImportExportPage } from "./use-import-export-page";

interface ImportExportPageProps {}

export const ImportExportPage: React.FC<ImportExportPageProps> = () => {
  const { t } = useTranslation(["project-import-export"]);
  const projectId = useProjectIdParam();
  const dispatch = useAppDispatch();

  const isImportingTranslations = useSelector(selectIsImportingTranslations);

  const {
    isImportConfirmOpen,
    openImportConfirm,
    closeImportConfirm,
    handleImportTranslations,
  } = useImportExportPage(+projectId);

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

  if (isImportingTranslations) {
    return <Typography>Importing translations to project...</Typography>;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6" gutterBottom>
            {t("import_header")}
          </Typography>
          <Typography>{t("import.description")}</Typography>
          <Box my={2}>
            <Button
              onClick={openImportConfirm}
              variant="contained"
              color="primary"
            >
              {t("import.button_label")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" component="h6">
            {t("export_header")}
          </Typography>
          <ExportForm onSubmit={handleExport} />
        </Grid>
      </Grid>
      <Confirm
        open={isImportConfirmOpen}
        message={t("import.confirm_message")}
        onCancel={closeImportConfirm}
        onOk={() => {
          closeImportConfirm();
          handleImportTranslations();
        }}
      />
    </>
  );
};
