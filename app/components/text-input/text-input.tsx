import type { InputHTMLAttributes } from "react";

type TextInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ label, ...inputProps }: TextInputProps) {
  return (
    <label className="w-full flex flex-col space-y-2">
      <span className="block text-sm text-gray-500">{label}</span>

      <input
        autoComplete="off"
        className="text-sm font-medium px-5 py-3 border border-slate-200 rounded-lg outline-none"
        {...inputProps}
      />
    </label>
  );
}
