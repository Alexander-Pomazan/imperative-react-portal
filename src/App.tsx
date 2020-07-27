import React from "react";

import { ModalContextProvider } from "./modal-context";
import { ModalUser } from "./modal-user";

function App() {
  return (
    <ModalContextProvider>
      <ModalUser />
    </ModalContextProvider>
  );
}

export default App;
