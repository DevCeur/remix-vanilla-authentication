import { Link, useLocation } from "@remix-run/react";

import { ROUTE } from "~/utils/enum";

type SignFormWrapperProps = {
  children: React.ReactNode;
  title: string;
  caption: string;
};

export function SignFormWrapper({ children, title, caption }: SignFormWrapperProps) {
  const location = useLocation();

  const isSignIn = location.pathname === ROUTE.SIGN_IN;
  const redirectLinkUrl = isSignIn ? ROUTE.SIGN_UP : ROUTE.SIGN_IN;
  const redirectLinkText = isSignIn
    ? "Don't have an account? Sign Up"
    : "Already have an account? Sign In";

  return (
    <div className="w-full max-w-md p-8 border border-slate-200 rounded-xl">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <span className="block text-sm text-gray-600">{caption}</span>
      </header>

      <div className="my-6">{children}</div>

      <div className="text-sm text-gray-500 text-center">
        <Link to={redirectLinkUrl}>{redirectLinkText}</Link>
      </div>
    </div>
  );
}
