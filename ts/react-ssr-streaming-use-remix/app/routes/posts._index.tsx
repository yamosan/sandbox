import { defer } from "@remix-run/node";
import { Await, useAsyncValue, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import type { SerializeFrom } from "@remix-run/node";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

async function fetchPost() {
  await new Promise((res) => setTimeout(res, 2000));
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post: Post = await res.json();

  return post;
}

export function loader() {
  const postPromise = fetchPost();

  return defer({
    post: postPromise,
  });
}

export default function PostsIndexRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Hello World!</h1>
      <Suspense fallback={<p>loading...</p>}>
        <Await resolve={data.post} errorElement={<p>error loading post!</p>}>
          <PostList />
        </Await>
      </Suspense>
    </main>
  );
}

function PostList() {
  const post = useAsyncValue() as Awaited<SerializeFrom<typeof loader>["post"]>;

  return (
    <div>
      {post.title}: {post.body}
    </div>
  );
}
