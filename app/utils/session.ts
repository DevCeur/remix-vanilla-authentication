import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const AUTH_SCECRET = process.env.AUTH_SECRET;

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "rva_auth_session",
    secrets: [AUTH_SCECRET as string],
    sameSite: "lax",
    maxAge: 31 * 24 * 60 * 60,
  },
});
