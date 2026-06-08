import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-surface rounded-3xl border border-border shadow-lg shadow-primary/5 ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
