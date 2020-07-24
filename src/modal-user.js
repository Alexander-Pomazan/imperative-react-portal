import React from "react";
import { useModalContext } from "./modal-context";

const ModalContent = ({ onAccept }) => {
  return <div onClick={onAccept}>INSIDE MODAL I AM</div>;
};

export const ModalUser = () => {
  const { handleSet } = useModalContext();

  const confirm = (onAccept) => {
    return handleSet(ModalContent, onAccept);
  };

  return (
    <div>
      <button
        onClick={async () => {
          const response = await confirm();

          console.log(response);
        }}
      >
        click me
      </button>
    </div>
  );
};
