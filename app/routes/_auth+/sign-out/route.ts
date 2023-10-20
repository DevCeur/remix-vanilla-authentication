import { redirect } from "@remix-run/node";

import type { LoaderFunction } from "@remix-run/node";

import { ROUTE } from "~/utils/enum";

import { commitSession, getUserSession } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await getUserSession({ request });

  session.unset("user");

  return redirect(ROUTE.HOME, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
};
