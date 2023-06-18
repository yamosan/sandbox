import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.get("/page1", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "static/page1.html"));
});

app.get("/page2", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "static/page2.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at: http://localhost:${PORT}`);
});
