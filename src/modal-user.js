import React, { useCallback } from "react";
import { useModalContext } from "./modal-context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

const ModalContent = ({ onResolve }) => {
  console.log(onResolve);
  return (
    <Dialog open>
      <DialogTitle>Would you like to confirm you action?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirmation of your actions would lead to your actions changing their
          status to be confirmed. Cancellation of confirmation is strictly
          descouraged as it can lead to various non-confirmed bugs.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onResolve("not-confirmed")}>Cancel</Button>
        <Button color="primary" onClick={() => onResolve("confirmed")}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ModalUser = () => {
  const { handleSet } = useModalContext();

  const confirm = useCallback(() => {
    return handleSet(({ onResolve }) => (
      <ModalContent key={1} onResolve={onResolve} />
    ));
  }, [handleSet]);

  const handleClose = useCallback(async () => {
    const response = await confirm();

    alert(response);
  }, [confirm]);

  return (
    <div>
      <Button onClick={handleClose}>Open modal</Button>
    </div>
  );
};
