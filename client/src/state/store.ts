import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { importExportSlice } from "../features/import-export/import-export.slice";

import { projectsSlice } from "../features/projects/projects.slice";
import { translationsSlice } from "../features/translations/translations.slice";

export const rootReducers = {
  [projectsSlice.name]: projectsSlice.reducer,
  [translationsSlice.name]: translationsSlice.reducer,
  [importExportSlice.name]: importExportSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type RootStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
