import { Form, useActionData, useNavigation } from "@remix-run/react";

import type { action } from "./route";

import { SignFormWrapper } from "~/components/sign-form-wrapper";
import { TextInput } from "~/components/text-input";
import { Button } from "~/components/button";

export function SignUpView() {
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
