import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

type ConfirmationDialogProps = {
  onClose: () => void;
  onAccept: () => void;
  title?: string;
  body?: string;
};

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onAccept,
  onClose,
  title,
  body,
}) => {
  return (
    <Dialog open onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {body && (
        <DialogContent>
          <DialogContentText>{body}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={onAccept}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
