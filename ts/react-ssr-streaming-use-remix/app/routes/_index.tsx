import { Link } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <div>
      <h1>Hello World!</h1>
      <Link to="/posts">/posts</Link>
    </div>
  );
}
