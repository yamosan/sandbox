import { Suspense, useState } from "react";
import { Loadable } from "./loadable";

async function fetchMessage() {
  const data = await fetch("http://localhost:3000/data");
  const message = await data.text();
  return message;
}

const Body = () => {
  const [data] = useState(() => new Loadable(fetchMessage()));

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Inner data={data} />
    </Suspense>
  );
};
const Inner = ({ data }: { data: Loadable<string> }) => {
  const [count, setCount] = useState(0);
  const message = data.read();

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
