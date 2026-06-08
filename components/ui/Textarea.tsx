import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.replace(/\s/g, "-").toLowerCase();

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={inputId} className="text-lg font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`min-h-32 px-4 py-3 text-lg rounded-xl border-2 border-border bg-white focus:outline-none focus:border-primary resize-y ${error ? "border-error" : ""} ${className}`}
          {...props}
        />
        {error && <p className="text-error text-base">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
