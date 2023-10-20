import { Link, Outlet } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import { Navlink } from "~/components/navlink";

export default function PrivateLayout() {
  return (
    <div>
      <header className="w-full mb-6 py-6 flex justify-between items-center border-b border-slate-200">
        <div>
          <Link
            to={ROUTE.DASHBOARD}
            className="text-lg font-semibold mr-6 pr-6 border-r border-slate-200"
          >
            Private Layout
          </Link>

          <Navlink to={ROUTE.DASHBOARD}>Dashboard</Navlink>
        </div>

        <div className="space-x-8">
          <Navlink to={ROUTE.PROFILE}>Profile</Navlink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
