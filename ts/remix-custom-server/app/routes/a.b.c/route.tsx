import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = ({ context }) => {
  const requestId = context.requestId;
  console.log(`requestId: ${requestId}`);
  console.log("c loader");
  return json({ c: "c" });
};
export default function View() {
  return (
    <div>
      <div style={{ backgroundColor: "yellow" }}>c layout</div>
      <Outlet />
    </div>
  );
}
