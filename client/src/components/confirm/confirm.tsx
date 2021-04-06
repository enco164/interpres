import { DialogContentText } from "@material-ui/core";
import React from "react";
import { ConfirmBase, ConfirmBaseProps } from "../confirm-base/confirm-base";

interface ConfirmProps extends Omit<ConfirmBaseProps, "content"> {
  message: string;
}

export const Confirm: React.FC<ConfirmProps> = (props) => {
  return (
    <ConfirmBase
      {...props}
      content={<DialogContentText>{props.message}</DialogContentText>}
    />
  );
};
