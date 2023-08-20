import express from "express";
import { App } from "./App";
import path from "path";
import { renderToPipeableStream } from "react-dom/server";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "../build")));

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get("/", async (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/index.js"],
    onShellReady() {
      pipe(res);
    },
  });
});

app.get("/data", async (req, res) => {
  await new Promise<string>((res) => setTimeout(res, 3000));
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});
