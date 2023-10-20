import type { InputHTMLAttributes } from "react";

type TextInputProps = {
  label: string;
  errors: { [x: string]: { _errors: string[] } };
} & InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ label, errors, name, ...inputProps }: TextInputProps) {
  const errorMessage = errors?.[name as string]?._errors?.[0];

  return (
    <label className="w-full flex flex-col space-y-1">
      <span className="block text-sm text-gray-500">{label}</span>

      <input
        name={name}
        autoComplete="off"
        className="text-sm font-medium px-5 py-3 border border-slate-200 rounded-lg outline-none"
        {...inputProps}
      />

      {errorMessage && <span className="block text-xs text-red-500">{errorMessage}</span>}
    </label>
  );
}
