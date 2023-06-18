import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
    </>
  );
};
