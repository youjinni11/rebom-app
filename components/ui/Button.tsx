import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "secondary" | "outline" | "danger";
  fullWidth?: boolean;
  loading?: boolean;
}

const variants = {
  primary: "bg-primary text-cream hover:bg-primary-hover shadow-md shadow-primary/20",
  gold: "bg-gold text-primary hover:bg-gold-hover shadow-md shadow-gold/25 font-semibold",
  secondary: "bg-primary-light text-primary hover:bg-muted",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary-light",
  danger: "bg-error text-cream hover:opacity-90",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`min-h-12 px-6 py-3 text-lg font-semibold rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "처리 중..." : children}
    </button>
  );
}
