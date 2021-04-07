import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { Confirm, ConfirmForm } from "../../components";
import { useProjectIdParam } from "../../hooks/use-project-id-param";
import { ExportForm, validationSchema } from "./export-form";
import { useImportExportPage } from "./use-import-export-page";

interface ImportExportPageProps {}

export const ImportExportPage: React.FC<ImportExportPageProps> = () => {
  const { t } = useTranslation(["project-import-export"]);
  const projectId = useProjectIdParam();

  const {
    isImportConfirmOpen,
    isExportConfirmOpen,
    isImportingTranslations,
    isExportingTranslations,
    openImportConfirm,
    openExportConfirm,
    closeImportConfirm,
    closeExportConfirm,
    handleImportTranslations,
    handleExportTranslations,
  } = useImportExportPage(+projectId);

  if (isImportingTranslations) {
    return <Typography>Importing translations to project...</Typography>;
  }

  if (isExportingTranslations) {
    return <Typography>Exporting translations to GitHub...</Typography>;
  }

  return (
    <>
      <Grid container spacing={2}>
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
          <Typography>{t("export.description")}</Typography>
          <Box my={2}>
            <Button
              onClick={openExportConfirm}
              variant="contained"
              color="primary"
            >
              {t("export.button_label")}
            </Button>
          </Box>
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
      <ConfirmForm
        title={t("export.confirm.title")}
        open={isExportConfirmOpen}
        onCancel={closeExportConfirm}
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={(values) => {
          closeExportConfirm();
          handleExportTranslations(values);
        }}
        validationSchema={validationSchema}
        renderForm={(formik) => (
          <>
            <Box mb={2}>
              <Typography>{t("export.confirm.message")}</Typography>
            </Box>
            <ExportForm
              formik={formik}
              labels={{
                title_label: t("export.confirm.title_label"),
                description_label: t("export.confirm.description_label"),
                description_helper: t("export.confirm.description_helper"),
              }}
            />
          </>
        )}
      />
    </>
  );
};
