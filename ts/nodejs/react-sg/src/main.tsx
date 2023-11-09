import ReactDOMServer from "react-dom/server";
import { App } from "./javascript/App";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const app = ReactDOMServer.renderToString(<App />);
console.log(app);
const html = `
        <html lang="en">
        <head>
            <script src="index.js" async defer></script>
        </head>
        <body>
            <div id="root">${app}</div>
        </body>
        </html>
    `;
const file = path.resolve(__dirname, "../build/index.html");

async function main() {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
  process.exit();
}

main();
