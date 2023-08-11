import { ReactNode, createContext, useContext, useMemo } from "react";

declare global {
  var __loaderData: unknown | undefined;
}

type LoaderDataContext<T> = {
  data: T;
};

const loaderDataContext = createContext<LoaderDataContext<unknown> | null>(
  null
);

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
  const isBrowser = typeof window !== "undefined";

  let loaderData;
  if (isBrowser) {
    loaderData = window?.__loaderData;
    if (loaderData === undefined) {
      throw new Error(`window.__loaderData is not defined.`);
    }
  } else {
    loaderData = data;
  }

  return (
    <>
      <loaderDataContext.Provider value={{ data: loaderData }}>
        {children}
      </loaderDataContext.Provider>
      {!isBrowser ? (
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.__loaderData = JSON.parse('${JSON.stringify(
              data
            )}');`,
          }}
        />
      ) : null}
    </>
  );
}
