import { Button, Grid, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { ImportTranslationsDto } from '../../api/dto/import-translations.dto';
import { useAppDispatch } from '../../state/store';
import { importTranslations } from './import-export.slice';
import { ImportForm } from './import-form';

interface ImportExportPageProps {}

export const ImportExportPage: React.FC<ImportExportPageProps> = () => {
  const dispatch = useAppDispatch();
  const handleImportTranslations = useCallback(
    async (values: ImportTranslationsDto) => {
      console.log(values);
      try {
        const result = unwrapResult(await dispatch(importTranslations(values)));
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch],
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
        <Button color="primary">Export</Button>
      </Grid>
    </Grid>
  );
};
