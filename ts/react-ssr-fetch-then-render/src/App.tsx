import { useState } from "react";
import { useLoaderData } from "./LoaderDataProvider";
import { User } from "./api/user";

export const App = () => {
  const [count, setCount] = useState(0);
  const { data } = useLoaderData<User>();

  return (
    <>
      <h1>Hello {data.name}!</h1>
      <p>count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-1</button>
    </>
  );
};
