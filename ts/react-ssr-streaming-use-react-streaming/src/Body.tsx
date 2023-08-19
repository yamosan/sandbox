import { useState } from "react";
import { useAsync } from "react-streaming";

async function fetchMessage() {
  const message = "Hello World!";
  return new Promise<string>((res) => setTimeout(() => res(message), 3000));
}

const Body = () => {
  const [count, setCount] = useState(0);
  const message = useAsync("key", fetchMessage);

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
