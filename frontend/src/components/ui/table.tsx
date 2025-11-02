import * as React from "react";

export function Table({
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={`w-full text-sm border-collapse ${className}`}
      {...props}
    />
  );
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <thead {...props} />;
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <tbody {...props} />;
}

export function TableRow(
  props: React.HTMLAttributes<HTMLTableRowElement>
) {
  return (
    <tr
      className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
      {...props}
    />
  );
}

export function TableHead(
  props: React.ThHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <th
      className="px-4 py-2 text-left font-medium text-muted-foreground"
      {...props}
    />
  );
}

export function TableCell(
  props: React.TdHTMLAttributes<HTMLTableCellElement>
) {
  return <td className="px-4 py-2 align-middle" {...props} />;
}
