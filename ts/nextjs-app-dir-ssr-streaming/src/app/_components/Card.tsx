"use client";
import { ReactNode, useState } from "react";

export const Card = ({ title, body }: { title: string; body: string }) => {
  const [count, setCount] = useState(0);
  return (
    <div className="block rounded-lg bg-white px-5 py-6 w-80 h-max border-gray-200 border">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
        {title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 line-clamp-2 whitespace-pre-wrap">
        {body}
      </p>
      <div className="flex space-x-3 items-center">
        <button
          className="rounded bg-blue-600 px-5 py-2.5 grid place-content-center text-xs font-medium text-white transition duration-150 ease-in-out hover:bg-blue-500"
          onClick={() => setCount((prev) => (prev += 1))}
        >
          BUTTON
        </button>

        <div>
          <div>{count}</div>
        </div>
      </div>
    </div>
  );
};

export const CardFallback = () => {
  return (
    <div className="block rounded-lg bg-white px-5 py-6 w-80 h-max border-gray-200 border">
      <div className="mb-3 h-[25px] w-1/3 bg-gray-300 animate-pulse">
        {/* title */}
      </div>

      <div className="mb-5 flex flex-col space-y-2">
        {/* body */}
        <div className="h-4 w-full bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-full bg-gray-300 animate-pulse"></div>
      </div>

      <div className="flex space-x-3 items-center">
        <div className="w-[90px] h-9 bg-gray-300 animate-pulse">
          {/* button */}
        </div>
        <div>
          <div className="animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
