import express from "express";
import { App } from "./App";
import path from "path";
import { renderToStream } from "react-streaming/server";
import { renderToPipeableStream } from "react-dom/server";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", async (req, res) => {
  const { pipe } = await renderToStream(<App />, {
    disable: false,
    renderToPipeableStream: (children, options) =>
      renderToPipeableStream(children, {
        ...options,
        bootstrapScripts: ["/index.js"],
      }),
  });

  pipe?.(res);
});

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});
