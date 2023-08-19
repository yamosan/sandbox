import express from "express";
import { App } from "./App";
import path from "path";
import { renderToStream } from "react-streaming/server";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", async (req, res) => {
  const { pipe } = await renderToStream(<App />, { disable: false });

  pipe?.(res);

  // const { pipe } = renderToPipeableStream(
  //   <DataProvider data={createServerData()}>
  //     <AppServer />
  //   </DataProvider>,
  //   {
  //     bootstrapScripts: ["/index.js"],
  //     onShellReady() {
  //       res.write("<html><body>");
  //       pipe(stream);
  //     },
  //   }
  // );
});

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});
