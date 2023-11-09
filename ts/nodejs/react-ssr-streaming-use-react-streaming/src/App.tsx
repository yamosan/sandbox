import { Suspense } from "react";
import Body from "./Body";

export const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>my app</title>
      </head>
      <body>
        <Suspense fallback={<div>loading...</div>}>
          <Body />
        </Suspense>
      </body>
    </html>
  );
};
