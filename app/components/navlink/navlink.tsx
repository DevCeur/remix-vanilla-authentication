import { NavLink as RemixNavlink } from "@remix-run/react";

import type { NavLinkProps as RemixNavlinkProps } from "@remix-run/react";

type NavlinkProps = {
  children: React.ReactNode;
} & RemixNavlinkProps;

export function Navlink({ children, ...linkProps }: NavlinkProps) {
  return (
    <RemixNavlink
      className={({ isActive }) =>
        `text-sm hover:text-blue-500 ${isActive ? "text-blue-500" : "text-gray-500"}`
      }
      {...linkProps}
    >
      {children}
    </RemixNavlink>
  );
}
