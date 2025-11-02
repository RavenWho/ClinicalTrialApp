import * as React from "react";

export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-card border border-border rounded-xl shadow-sm ${className}`}
      {...props}
    />
  );
}

export function CardHeader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-4 border-b border-border ${className}`}
      {...props}
    />
  );
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`font-semibold text-base leading-none tracking-tight ${className}`}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-4 ${className}`}
      {...props}
    />
  );
}

export function CardFooter({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-4 border-t border-border ${className}`}
      {...props}
    />
  );
}
