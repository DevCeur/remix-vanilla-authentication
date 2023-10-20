import { json, redirect } from "@remix-run/node";

import type { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";

import { ROUTE } from "./enum";
import { getSession } from "./session";

const PUBLIC_ROUTES = [ROUTE.HOME, ROUTE.ABOUT, ROUTE.BLOG, ROUTE.SIGN_IN, ROUTE.SIGN_UP];
const PRIVATE_ROUTES = [ROUTE.DASHBOARD, ROUTE.PROFILE];

type WithAuthLoaderOptions = {
  callback?: LoaderFunction;
  loaderArgs: LoaderFunctionArgs;
};

export async function withAuthLoader({ callback, loaderArgs }: WithAuthLoaderOptions) {
  const { request } = loaderArgs;

  const { pathname } = new URL(request.url);

  const authCookie = request.headers.get("cookie");
  const session = await getSession(authCookie);

  const isAuth = session.has("userId");

  if (isAuth && PUBLIC_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.DASHBOARD);
  }

  if (!isAuth && PRIVATE_ROUTES.includes(pathname)) {
    throw redirect(ROUTE.HOME);
  }

  if (callback) {
    return await callback({ ...loaderArgs });
  }

  return json({ ok: true });
}
