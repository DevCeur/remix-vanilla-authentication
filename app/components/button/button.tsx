import { cva } from "class-variance-authority";
import { useRef, useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi/index.js";

import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  [
    "text-sm font-medium px-5 py-3 flex justify-center items-center border border-transparent rounded-lg",
  ],
  {
    variants: {
      variant: {
        primary: ["text-white", "bg-slate-900", "hover:bg-slate-800"],

        danger: ["text-red-500", "hover:bg-red-50", "!border-red-500"],
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
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({
  children,
  isLoading,
  variant,
  width,
  ...buttonProps
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [calculatedInitialWidth, setCalculatedInitialWidth] = useState<number>();

  useEffect(() => {
    setCalculatedInitialWidth(buttonRef.current?.offsetWidth);
  }, []);

  return (
    <button
      ref={buttonRef}
      disabled={isLoading}
      className={`${buttonStyles({
        variant,
        width,
      })} w-[${calculatedInitialWidth}px] disabled:opacity-80`}
      {...buttonProps}
    >
      {isLoading ? (
        <span className="block animate-spin">
          <BiLoaderAlt />
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
