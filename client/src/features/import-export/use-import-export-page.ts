import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../state/store";
import {
  openImportConfirm as openImportConfirmAction,
  closeImportConfirm as closeImportConfirmAction,
  openExportConfirm as openExportConfirmAction,
  closeExportConfirm as closeExportConfirmAction,
  selectImportExportSlice,
  importTranslations,
  selectIsImportingTranslations,
  exportTranslations,
  selectIsExportingTranslations,
} from "./import-export.slice";

export const useImportExportPage = (projectId: string) => {
  const dispatch = useAppDispatch();
  const importExportSliceState = useSelector(selectImportExportSlice);
  const isImportingTranslations = useSelector(selectIsImportingTranslations);
  const isExportingTranslations = useSelector(selectIsExportingTranslations);

  const openImportConfirm = useCallback(() => {
    dispatch(openImportConfirmAction());
  }, [dispatch]);

  const closeImportConfirm = useCallback(() => {
    dispatch(closeImportConfirmAction());
  }, [dispatch]);

  const openExportConfirm = useCallback(() => {
    dispatch(openExportConfirmAction());
  }, [dispatch]);

  const closeExportConfirm = useCallback(() => {
    dispatch(closeExportConfirmAction());
  }, [dispatch]);

  const handleImportTranslations = useCallback(async () => {
    try {
      unwrapResult(await dispatch(importTranslations({ projectId })));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, projectId]);

  const handleExportTranslations = useCallback(
    async (param: { title: string; description: string }) => {
      try {
        const result = unwrapResult(
          await dispatch(exportTranslations({ ...param, projectId }))
        );
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, projectId]
  );

  return {
    isImportConfirmOpen: importExportSliceState.isImportConfirmOpen,
    isExportConfirmOpen: importExportSliceState.isExportConfirmOpen,
    isImportingTranslations,
    isExportingTranslations,
    openImportConfirm,
    closeImportConfirm,
    openExportConfirm,
    closeExportConfirm,
    handleImportTranslations,
    handleExportTranslations,
  };
};
