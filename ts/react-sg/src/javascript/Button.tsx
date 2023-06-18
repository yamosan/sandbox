import { FC, useState } from "react";

type Props = {};

export const Button: FC<Props> = (props) => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => (prev += 1))}>
      count: {count}
    </button>
  );
};
