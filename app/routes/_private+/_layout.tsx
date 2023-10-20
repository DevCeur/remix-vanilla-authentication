import { Form, Link, Outlet, useLoaderData, useNavigation } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";
import { getUserSession } from "~/utils/session";

import { Navlink } from "~/components/navlink";
import { Button } from "~/components/button";

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await getUserSession({ request });

  const name = session.get("user").name;

  return { name };
};

export default function PrivateLayout() {
  const navigation = useNavigation();
  const { name } = useLoaderData<typeof loader>();

  const isLoading = navigation.state === "submitting";

  return (
    <div>
      <header className="w-full mb-6 py-6 flex justify-between items-center border-b border-slate-200">
        <div>
          <Link to={ROUTE.DASHBOARD} className="text-lg font-semibold">
            Private Layout
          </Link>

          <span className="inline-block text-sm font-normal mx-6 px-6 border-x border-slate-200 cursor-default">
            Hi {name}
          </span>

          <Navlink to={ROUTE.DASHBOARD}>Dashboard</Navlink>
        </div>

        <div className="flex justify-center items-center space-x-8">
          <Navlink to={ROUTE.PROFILE}>Profile</Navlink>

          <Form action="/sign-out" method="get">
            <Button type="submit" variant="danger" isLoading={isLoading}>
              Sign Out
            </Button>
          </Form>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
