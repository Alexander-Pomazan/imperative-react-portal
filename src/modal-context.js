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
  var res, rej;

  var promise = new Promise((resolve, reject) => {
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
  const [render, setRender] = useState(null); //

  const handleSet = useCallback((Component) => {
    const promise = defer();

    const renderFunc = () => () => {
      return (
        <Component
          onAccept={() => {
            promise.resolve("yes");
            setRender(null);
          }}
        />
      );
    };

    setRender(renderFunc);

    return promise;
  }, []);

  const contextValue = useMemo(() => ({ handleSet }), [handleSet]);

  console.log({ render });

  return (
    <Fragment>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      {createPortal(render && render(), document.getElementById("root"))}
    </Fragment>
  );
};
