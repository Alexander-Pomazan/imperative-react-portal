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

const ModalContent: React.FC<{
  onResolve: (arg: "confirmed" | "not-confirmed") => void;
}> = ({ onResolve }) => {
  return (
    <Dialog open>
      <DialogTitle>Would you like to confirm you action?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirmation of your actions would lead to your actions changing their
          status to be confirmed. Cancellation of confirmation is strictly
          discouraged as it can lead to various non-confirmed bugs.
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
  const { renderComponent } = useModalContext();

  const confirm = useCallback(() => {
    return renderComponent(({ onResolve }) => (
      <ModalContent key={1} onResolve={onResolve} />
    ));
  }, [renderComponent]);

  const handleClose = useCallback(async () => {
    const response = await confirm();

    console.log(response);
  }, [confirm]);

  return (
    <div>
      <Button onClick={handleClose}>Open modal</Button>
    </div>
  );
};
