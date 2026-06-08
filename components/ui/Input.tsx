import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.replace(/\s/g, "-").toLowerCase();

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-lg font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`min-h-12 px-4 text-lg rounded-xl border-2 border-border bg-white focus:outline-none focus:border-primary ${error ? "border-error" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-error text-base">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
