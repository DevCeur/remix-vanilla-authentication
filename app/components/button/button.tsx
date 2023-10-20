import { cva } from "class-variance-authority";

import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  ["text-sm font-medium px-5 py-3 border border-transparent rounded-lg"],
  {
    variants: {
      variant: {
        primary: ["text-white", "bg-slate-900", "hover:bg-slate-800"],

        danger: ["text-red-500", "hover:bg-red-50", "border-red-500"],
      },

      width: {
        auto: ["w-auto"],

        full: ["w-full"],
      },
    },

    defaultVariants: {
      variant: "primary",
      width: "auto",
    },
  }
);

type ButtonProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({ children, variant, width, ...buttonProps }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, width })} {...buttonProps}>
      {children}
    </button>
  );
}
