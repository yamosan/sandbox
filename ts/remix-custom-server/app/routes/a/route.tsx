import { json, type LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = ({ context }) => {
  const requestId = context.requestId;
  console.log(`requestId: ${requestId}`);
  console.log("a loader");
  return json({ a: "a" });
};

export default function View() {
  return (
    <div>
      <div style={{ backgroundColor: "red" }}>a layout</div>
      <Outlet />
    </div>
  );
}
