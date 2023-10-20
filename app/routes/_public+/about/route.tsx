import type { LoaderFunction } from "@remix-run/node";

import { withAuthLoader } from "~/utils/with-auth-loader";

export const loader: LoaderFunction = (loaderArgs) => withAuthLoader({ loaderArgs });

export default function AboutRoute() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
