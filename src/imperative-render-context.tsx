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

type RenderProp<T> = (arg: { onResolve: (arg: T) => void }) => React.ReactNode;

type RenderComponent = <T>(renderProp: RenderProp<T>) => Promise<T>;

interface ContextValue {
  renderComponent: RenderComponent;
}

const ImperativeRenderContext = createContext<ContextValue>({
  // @ts-ignore
  renderComponent: async (render) => {},
});

export const useImperativeRender = () => useContext(ImperativeRenderContext);

export const ImperativeRenderProvider: React.FC = ({ children }) => {
  const [portalChildren, setPortalChildren] = useState<React.ReactNode[]>([]);

  const addChild = useCallback((child) => {
    setPortalChildren((currentChildren) => [...currentChildren, child]);
  }, []);

  const removeChild = useCallback((childToRemove) => {
    setPortalChildren((currentChildren) =>
      currentChildren.filter((child) => {
        return child !== childToRemove;
      })
    );
  }, []);

  const renderComponent = useCallback<RenderComponent>(
    (renderChild) => {
      return new Promise((resolve) => {
        const newChild = (
          <Fragment key={nanoid()}>
            {renderChild({
              onResolve: (...args) => {
                removeChild(newChild);
                resolve(...args);
              },
            })}
          </Fragment>
        );

        addChild(newChild);
      });
    },
    [addChild, removeChild]
  );

  const contextValue = useMemo(() => ({ renderComponent }), [renderComponent]);

  return (
    <Fragment>
      <ImperativeRenderContext.Provider value={contextValue}>
        {children}
      </ImperativeRenderContext.Provider>
      {createPortal(portalChildren, document.getElementById("root")!)}
    </Fragment>
  );
};
