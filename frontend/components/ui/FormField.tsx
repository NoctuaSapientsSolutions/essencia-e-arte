"use client";

import type { InputHTMLAttributes } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormField({ label, error, className = "", id, ...inputProps }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-erro` : undefined}
        className={`mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm ${
          error ? "border-stock-out" : "border-border"
        }`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-xs text-stock-out">
          {error}
        </p>
      )}
    </div>
  );
}
