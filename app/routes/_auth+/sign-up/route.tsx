import { z } from "zod";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";

import type { ZodError } from "zod";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { commitSession, getUserSession } from "~/utils/session";
import { withAuthLoader } from "~/utils/with-auth-loader";
import { FIELD_REQUIRED_ERROR_MESSAGE, ROUTE } from "~/utils/enum";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export const loader: LoaderFunction = (loaderArgs) =>
  withAuthLoader({
    loaderArgs,
  });

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE })
      .max(24, "This name is too long"),
    username: z
      .string()
      .min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE })
      .max(24, "This username is too long")
      .min(3, "This username is too short"),
    email: z
      .string()
      .min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE })
      .email("This is not a valid email"),
    password: z
      .string()
      .min(1, { message: FIELD_REQUIRED_ERROR_MESSAGE })
      .min(6, "This password is too short"),
  })
  .required({ name: true, username: true, email: true, password: true });

export const action: ActionFunction = async ({ request }) => {
  const { session } = await getUserSession({ request });

  const formData = Object.fromEntries(await request.formData());

  try {
    FormSchema.parse(formData);

    // here will go the user creation process

    // setting user session
    // TO-DO | Fix this and set it with a generated id"
    session.set("user", { email: formData.email });

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

export default function SignUpRoute() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const errors = actionData?.errors;
  const isLoading = navigation.state === "submitting";

  return (
    <SignFormWrapper title="Create Account" caption="Fill the form and create an account">
      <Form method="post" action="/sign-up">
        <div className="mb-5 grid grid-cols-2 gap-5">
          <TextInput label="Name" name="name" errors={errors} />

          <TextInput label="Username" name="username" errors={errors} />
        </div>

        <div className="mb-8 space-y-5">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g.: test@email.com"
            errors={errors}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="+6 characters"
            errors={errors}
          />
        </div>

        <Button width="full" isLoading={isLoading}>
          Create Account
        </Button>
      </Form>
    </SignFormWrapper>
  );
}
