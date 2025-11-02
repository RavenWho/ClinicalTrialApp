import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={`bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
);

Input.displayName = "Input";
