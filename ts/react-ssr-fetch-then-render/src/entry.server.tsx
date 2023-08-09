import express from "express";
import ReactDOMServer from "react-dom/server";
import { App } from "./App";
import path from "path";
import { LOADER_DATA_HANDOFF_KEY, LoaderDataProvider } from "./LoaderContext";
import { fetchUser } from "./api/user";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", async (req, res) => {
  const data = await fetchUser();

  const app = ReactDOMServer.renderToString(
    <LoaderDataProvider data={data}>
      <App />
    </LoaderDataProvider>
  );
  const html = `
        <html lang="en">
        <head>
            <script>
              window.${LOADER_DATA_HANDOFF_KEY}=JSON.parse('${JSON.stringify(data)}')
            </script>
            <script src="index.js" async defer></script>
        </head>
        <body>
            <div id="root">${app}</div>
        </body>
        </html>
    `;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});
