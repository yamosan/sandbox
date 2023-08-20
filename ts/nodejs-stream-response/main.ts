import express from "express";
import fetch from "node-fetch";

type Post = { id: string; title: string; body: string };
async function fetchPostById(id: string): Promise<Post> {
  const request = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const wait = new Promise((res) => setTimeout(res, 200));
  const [res, _] = await Promise.all([request, wait]);
  const post: Post = await res.json();

  return {
    ...post,
    title: post.title.slice(0, 20),
    body: post.body.slice(0, 40),
  };
}

type User = { id: string; name: string };
async function fetchUser(): Promise<User> {
  const request = fetch(`https://jsonplaceholder.typicode.com/users/1`);
  const wait = new Promise((res) => setTimeout(res, 1000));
  const [res, _] = await Promise.all([request, wait]);
  const user: User = await res.json();
  return user;
}

const PORT = 3000;

const app = express();
app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.write("<html><body><table>");
  res.write("<tr><th>id</th><th>title</th><th>body</th></tr>");
  for (let i = 1; i <= 10; i++) {
    const post = await fetchPostById(i.toString());
    res.write(
      `<tr><th>${post.id}</th><th>${post.title}</th><th>${post.body}</th></tr>`
    );
  }
  res.end("</table></body></html>");
});

app.get("/stream-loading", async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const startHtml = `
  <html><body><h1 id="title">loading...</h1>
  `;
  const endHtml = `
  </body></html>`;

  // 1. 最初のレンダリング結果を返す
  res.write(startHtml);

  // 2. データを取得する
  const user = await fetchUser();

  // 3. UIを書き換えるスクリプトを送信
  res.write(
    `<script>document.getElementById("title").innerText = "Hello! ${user.name}"</script>`
  );

  // 4. レスポンスを閉じる
  res.end(endHtml);
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
