import * as React from "react";

export function Badge({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-muted text-muted-foreground ${className}`}
      {...props}
    />
  );
}

export default Badge;
