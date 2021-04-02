import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../state/store";
import {
  openImportConfirm as openImportConfirmAction,
  closeImportConfirm as closeImportConfirmAction,
  selectImportExportSlice,
  importTranslations,
} from "./import-export.slice";

export const useImportExportPage = (projectId: number) => {
  const dispatch = useAppDispatch();
  const importExportSliceState = useSelector(selectImportExportSlice);

  const openImportConfirm = useCallback(() => {
    dispatch(openImportConfirmAction());
  }, [dispatch]);

  const closeImportConfirm = useCallback(() => {
    dispatch(closeImportConfirmAction());
  }, [dispatch]);

  const handleImportTranslations = useCallback(async () => {
    try {
      unwrapResult(
        await dispatch(importTranslations({ projectId: +projectId }))
      );
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, projectId]);

  return {
    isImportConfirmOpen: importExportSliceState.isImportConfirmOpen,
    openImportConfirm,
    closeImportConfirm,
    handleImportTranslations,
  };
};
