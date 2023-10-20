import { Link } from "@remix-run/react";

import type { LoaderFunction } from "@remix-run/node";

import { withAuthLoader } from "~/utils/with-auth-loader";

import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export const loader: LoaderFunction = (loaderArgs) => withAuthLoader({ loaderArgs });

export default function SignInRoute() {
  return (
    <SignFormWrapper title="Sign In" caption="Welcome back! Fill the form and sign in">
      <form>
        <div className="mb-8 space-y-5">
          <TextInput label="Email or Username" name="emailOrUsername" />

          <div className="flex flex-col space-y-2">
            <TextInput label="Password" name="password" type="password" />
            <Link to="/recover-password" className="text-right text-xs text-gray-400">
              Forgot my password
            </Link>
          </div>
        </div>

        <Button width="full">Sign In</Button>
      </form>
    </SignFormWrapper>
  );
}
