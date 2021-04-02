import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ExportTranslationsDto } from "../../api/dto/export-translations.dto";
import { ImportFromGithubDto } from "../../api/dto/import-from-github.dto";
import { ImportExportApi } from "../../api/import-export.api";
import { RequestStatus } from "../../core/request-status";
import { RootState } from "../../state/store";

type ImportExportState = {
  importStatus: RequestStatus;
  exportStatus: RequestStatus;
  isImportConfirmOpen: boolean;
};

const initialState: ImportExportState = {
  importStatus: RequestStatus.IDLE,
  exportStatus: RequestStatus.IDLE,
  isImportConfirmOpen: false,
};

export const importTranslations = createAsyncThunk<void, ImportFromGithubDto>(
  "importExport/importTranslations",
  (arg, { signal }) => ImportExportApi.importGithubToProject(arg, { signal })
);

export const exportTranslations = createAsyncThunk<
  unknown,
  ExportTranslationsDto
>("importExport/exportTranslations", (arg, { signal }) =>
  ImportExportApi.exportTranslations(arg, { signal })
);

export const importExportSlice = createSlice({
  name: "importExport",
  initialState,
  reducers: {
    openImportConfirm: (state) => {
      state.isImportConfirmOpen = true;
    },
    closeImportConfirm: (state) => {
      state.isImportConfirmOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importTranslations.pending, (state) => {
        state.importStatus = RequestStatus.PENDING;
      })
      .addCase(importTranslations.rejected, (state) => {
        state.importStatus = RequestStatus.REJECTED;
      })
      .addCase(importTranslations.fulfilled, (state) => {
        state.importStatus = RequestStatus.FULFILLED;
      });
  },
});

export const {
  openImportConfirm,
  closeImportConfirm,
} = importExportSlice.actions;

export const selectImportExportSlice = (state: RootState) =>
  state[importExportSlice.name];

export const selectIsImportingTranslations = createSelector(
  selectImportExportSlice,
  (state) => state.importStatus === RequestStatus.PENDING
);
