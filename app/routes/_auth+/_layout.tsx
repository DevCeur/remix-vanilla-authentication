import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="w-full flex justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
