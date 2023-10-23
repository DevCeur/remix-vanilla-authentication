import { z } from "zod";

import { json, redirect } from "@remix-run/node";

import type { ZodError } from "zod";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { FIELD_REQUIRED_ERROR_MESSAGE, ROUTE } from "~/utils/enum";

import { withAuthLoader } from "~/utils/with-auth-loader";
import { commitSession, setUserSession } from "~/utils/session";

import { SignInView } from "./view";

export const loader: LoaderFunction = (loaderArgs) => withAuthLoader({ loaderArgs });

const FormSchema = z
  .object({
    emailOrUsername: z.string().min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE }),
    password: z
      .string()
      .min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE })
      .min(6, { message: "This password is too short" }),
  })
  .required({ emailOrUsername: true, password: true });

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  try {
    FormSchema.parse(formData);

    // here will go the user creation process

    // setting user session
    // TO-DO | Fix this and set it with a generated id"
    const { session } = await setUserSession({ request, user: formData });

    session.set("user", {
      email: formData.email,
    });

    return redirect(ROUTE.DASHBOARD, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (err) {
    const error = err as Error & ZodError;

    const formattedErrors = error.format();

    return json({ errors: formattedErrors });
  }
};

export default function SignInRoute() {
  return <SignInView />;
}
