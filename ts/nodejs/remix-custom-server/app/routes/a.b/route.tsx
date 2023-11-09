import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = ({ context }) => {
  const requestId = context.requestId;
  console.log(`requestId: ${requestId}`);
  console.log("b loader");
  return json({ b: "b" });
};

export default function View() {
  return (
    <div>
      <div style={{ backgroundColor: "blue" }}>b layout</div>
      <Outlet />
    </div>
  );
}
