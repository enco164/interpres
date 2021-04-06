import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

export interface ConfirmBaseProps {
  open: boolean;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  labels?: {
    ok?: string;
    cancel?: string;
  };
  content: JSX.Element;
}

export const ConfirmBase: React.FC<ConfirmBaseProps> = ({
  open,
  title,
  onOk,
  onCancel,
  labels,
  content,
}) => {
  const cancelLabel = labels?.cancel ?? "Cancel";
  const okLabel = labels?.ok ?? "OK";
  return (
    <Dialog open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" variant="outlined">
          {cancelLabel}
        </Button>
        <Button
          onClick={onOk}
          color="primary"
          variant="contained"
          disableElevation
          autoFocus
        >
          {okLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
