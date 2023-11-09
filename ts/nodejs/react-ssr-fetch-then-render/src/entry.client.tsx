import { hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { LoaderDataProvider } from "./LoaderDataProvider";

const container = document.getElementById("root")!;
hydrateRoot(
  container,
  <LoaderDataProvider>
    <App />
  </LoaderDataProvider>
);
