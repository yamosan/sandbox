import { Suspense, useState } from "react";
import { Await, useAsync } from "./SuspenseContext";

async function fetchMessage() {
  const data = await fetch("http://localhost:3000/data");
  const message = await data.text();
  return message;
}

const Body = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await keys={"key"} resolver={fetchMessage}>
        <Inner />
      </Await>
    </Suspense>
  );
};
const Inner = () => {
  const [count, setCount] = useState(0);
  const message = useAsync<string>();

  return (
    <div>
      <h1>{message}</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
    </div>
  );
};

export default Body;
