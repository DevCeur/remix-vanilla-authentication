import { Button } from "~/components/button";
import { TextInput } from "~/components/text-input";
import { SignFormWrapper } from "~/components/sign-form-wrapper";

export default function SignUpRoute() {
  return (
    <SignFormWrapper title="Create Account" caption="Fill the form and create an account">
      <form>
        <div className="mb-5 grid grid-cols-2 gap-5">
          <TextInput label="Name" name="name" />

          <TextInput label="Username" name="username" />
        </div>

        <div className="mb-8 space-y-5">
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="e.g.: test@email.com"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="+6 characters"
          />
        </div>

        <Button width="full">Create Account</Button>
      </form>
    </SignFormWrapper>
  );
}
