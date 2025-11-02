// src/components/ui/separator.tsx
import * as React from "react";

export function Separator({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={`border-t border-border ${className}`}
      {...props}
    />
  );
}

export default Separator;
