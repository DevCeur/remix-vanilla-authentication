import { Link, Outlet } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

import { Navlink } from "~/components/navlink";

export default function PublicLayout() {
  return (
    <div>
      <header className="w-full mb-6 py-6 flex justify-between items-center border-b border-slate-200">
        <div className="flex items-center">
          <div className="mr-6 pr-6 border-r border-slate-200">
            <Link to={ROUTE.HOME} className="text-lg font-semibold">
              Public Layout
            </Link>
          </div>

          <nav className="space-x-8">
            <Navlink to={ROUTE.HOME}>Home</Navlink>
            <Navlink to={ROUTE.ABOUT}>About</Navlink>
            <Navlink to={ROUTE.BLOG}>Blog</Navlink>
          </nav>
        </div>

        <div className="space-x-8">
          <Navlink to={ROUTE.SIGN_IN}>Sign In</Navlink>
          <Navlink to={ROUTE.SIGN_UP}>Create Account</Navlink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
