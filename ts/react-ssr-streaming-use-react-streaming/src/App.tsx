import { Suspense, lazy } from "react";

const Body = lazy(() => import("./Body"));

export const App = () => {
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <Body />
      </Suspense>
    </div>
  );
};
