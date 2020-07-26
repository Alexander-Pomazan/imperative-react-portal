import React, {
  useCallback,
  Fragment,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";

const ModalContext = createContext(null);

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }) => {
  const [portalChildren, setPortalChildren] = useState([]);

  const addChild = useCallback((child) => {
    setPortalChildren((currentChildren) => [...currentChildren, child]);
  }, []);

  const removeChild = useCallback((childToRemove) => {
    setPortalChildren((currentChildren) =>
      currentChildren.filter((child) => child !== childToRemove)
    );
  }, []);

  const handleSet = useCallback(
    (ComponentToRender, componentProps = {}) => {
      return new Promise((resolve) => {
        const newChild = (
          <ComponentToRender
            key={nanoid()}
            onResolve={(resolveValue) => {
              resolve(resolveValue);
              removeChild(newChild);
            }}
            {...componentProps}
          />
        );

        addChild(newChild);
      });
    },
    [addChild, removeChild]
  );

  const contextValue = useMemo(() => ({ handleSet }), [handleSet]);

  return (
    <Fragment>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      {createPortal(portalChildren, document.getElementById("root"))}
    </Fragment>
  );
};
