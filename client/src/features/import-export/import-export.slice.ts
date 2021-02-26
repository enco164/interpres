import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ImportTranslationsDto } from '../../api/dto/import-translations.dto';
import { ImportExportApi } from '../../api/import-export.api';

type ImportExportState = {};

const initialState: ImportExportState = {};

export const importTranslations = createAsyncThunk<
  any[],
  ImportTranslationsDto
>('importExport/importTranslations', (arg, { signal }) =>
  ImportExportApi.importTranslations(arg, { signal }),
);

export const importExportSlice = createSlice({
  name: 'importExport',
  initialState,
  reducers: {},
});
