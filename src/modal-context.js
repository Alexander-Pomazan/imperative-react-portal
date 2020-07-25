import React, {
  useCallback,
  Fragment,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

// https://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
function defer() {
  let res, rej;

  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

const ModalContext = createContext(null);

export const useModalContext = () => useContext(ModalContext);

export const ModalContextProvider = ({ children }) => {
  const [portalChildren, setPortalChilren] = useState(null);

  const handleSet = useCallback((ComponentToRender, componentProps = {}) => {
    const promise = defer();

    const portalChild = (
      <ComponentToRender
        onResolve={(resolveValue) => {
          promise.resolve(resolveValue);
          setPortalChilren(null);
        }}
        {...componentProps}
      />
    );

    setPortalChilren(portalChild);

    return promise;
  }, []);

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
