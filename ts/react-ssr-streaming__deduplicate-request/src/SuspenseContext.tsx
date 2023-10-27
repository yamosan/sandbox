import { ReactNode, createContext, useContext, useMemo } from "react";
import { Loadable } from "./loadable";

const isServer = typeof window === "undefined";

type CacheValue = unknown;
const suspenses = new Map<string, Loadable<CacheValue>>();
const cache = new Map<string, CacheValue>();

type AwaitContextValue = {
  loader: Loadable<CacheValue>;
};
const AwaitContext = createContext<AwaitContextValue | null>(null);

export function useAsync<T>() {
  const ctx = useContext(AwaitContext);
  if (ctx === null)
    throw new Error(
      "The 'AwaitContext' is not available. Please make sure to use the 'useAsync' function within a component wrapped in the 'AwaitContext.Provider'."
    );

  const { loader } = ctx;
  return loader.read() as T;
}

type AwaitProps = {
  children: ReactNode;
  keys: string;
  resolver: () => Promise<unknown>;
};
export function Await({ children, keys, resolver }: AwaitProps) {
  const serializedKey = JSON.stringify(keys);
  const resolve = async () => {
    if (isServer) {
      if (cache.has(serializedKey)) {
        const cachedValue = cache.get(serializedKey);
        cache.delete(serializedKey);
        return cachedValue;
      }
      const resolvedValue = await resolver();
      cache.set(serializedKey, resolvedValue);
      return resolvedValue;
    } else {
      const node = document.getElementById(serializedKey);
      if (node === null || node.textContent === null) {
        throw new Error();
      }
      const initData = JSON.parse(node.textContent) as unknown;

      return initData;
    }
  };

  let loader: Loadable<unknown>;
  if (suspenses.has(serializedKey)) {
    loader = suspenses.get(serializedKey)!;
    suspenses.delete(serializedKey);
  } else {
    loader = new Loadable(resolve());
    suspenses.set(serializedKey, loader);
  }
  const data = loader?.read(); // FIXME: useAsync を実行する前からロードしてる

  return (
    <AwaitContext.Provider value={{ loader }}>
      {isServer && (
        <script
          id={serializedKey}
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      )}
      {children}
    </AwaitContext.Provider>
  );
}
