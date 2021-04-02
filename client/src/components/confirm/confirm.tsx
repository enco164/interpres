import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

interface ConfirmProps {
  open: boolean;
  message: string;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  labels?: {
    ok?: string;
    cancel?: string;
  };
}

export const Confirm: React.FC<ConfirmProps> = ({
  open,
  message,
  title,
  onOk,
  onCancel,
  labels,
}) => {
  const cancelLabel = labels?.cancel ?? "Cancel";
  const okLabel = labels?.ok ?? "OK";
  return (
    <Dialog open={open}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
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
