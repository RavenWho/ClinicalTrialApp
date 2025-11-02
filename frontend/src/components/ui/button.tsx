import * as React from "react";
import { cn } from "@/lib/utils"; // if you don't have this helper yet, I'll show you how below

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants: Record<string, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      ghost: "bg-transparent hover:bg-gray-100",
      link: "text-blue-600 underline-offset-4 hover:underline",
    };
    const sizes: Record<string, string> = {
      sm: "h-8 px-3",
      md: "h-10 px-4",
      lg: "h-12 px-6",
    };
    const classes = cn(base, variants[variant], sizes[size], className);

    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";
