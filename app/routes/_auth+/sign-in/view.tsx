import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

import type { action } from "./route";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export function SignInView() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  const errors = actionData?.errors;
  const isLoading = navigation.state === "submitting";

  return (
    <SignFormWrapper title="Sign In" caption="Welcome back! Fill the form and sign in">
      <Form action="/sign-in" method="post">
        <div className="mb-8 space-y-5">
          <TextInput label="Email or Username" name="emailOrUsername" errors={errors} />

          <div className="flex flex-col space-y-2">
            <TextInput label="Password" name="password" type="password" errors={errors} />
            <Link to="/recover-password" className="text-right text-xs text-gray-400">
              Forgot my password
            </Link>
          </div>
        </div>

        <Button width="full" isLoading={isLoading}>
          Sign In
        </Button>
      </Form>
    </SignFormWrapper>
  );
}
