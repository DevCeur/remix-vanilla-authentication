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

type GetUserSessionOptions = {
  request: Request;
};

export async function getUserSession({ request }: GetUserSessionOptions) {
  const cookie = request.headers.get("cookie");

  const session = await getSession(cookie);

  return { session };
}
