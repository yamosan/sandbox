import { ReactNode, createContext, useContext, useMemo } from "react";

type LoaderDataContext<T> = {
  data: T;
};

const loaderDataContext = createContext<LoaderDataContext<unknown> | null>(
  null
);

export const LOADER_DATA_HANDOFF_KEY = "LOADER_DATA";

export function useLoaderData<T>(): LoaderDataContext<T> {
  const ctx = useContext(loaderDataContext);
  if (ctx === null)
    throw new Error(
      "The 'loaderDataContext' is not available. Please make sure to use the 'useLoaderData' function within a component wrapped in the 'LoaderDataProvider'."
    );

  return ctx as LoaderDataContext<T>;
}

export function LoaderDataProvider({
  children,
  data,
}: {
  children: ReactNode;
  data?: unknown;
}) {
  const loaderData = useMemo(() => {
    // --- on server ---
    if (data !== undefined) {
      return data;
    }

    // ---- on client ---
    // @ts-ignore
    const serverCache = window?.[LOADER_DATA_HANDOFF_KEY];
    if (serverCache === undefined) {
      throw new Error(`window.${LOADER_DATA_HANDOFF_KEY} is not defined.`);
    }
    return serverCache;
  }, []);

  return (
    <loaderDataContext.Provider value={{ data: loaderData }}>
      {children}
    </loaderDataContext.Provider>
  );
}
