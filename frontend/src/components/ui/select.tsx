import * as React from "react";

type Ctx = {
  value?: string;
  onChange?: (v: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SelectCtx = React.createContext<Ctx | null>(null);

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const ctx: Ctx = { value, onChange: onValueChange, open, setOpen };
  return <SelectCtx.Provider value={ctx}>{children}</SelectCtx.Provider>;
}

export function SelectTrigger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(SelectCtx)!;
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={`w-full bg-[#111318] border border-border rounded-md px-3 py-2 text-left text-sm ${className}`}
    >
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const ctx = React.useContext(SelectCtx)!;
  return <span className="text-sm">{ctx.value ?? placeholder ?? ""}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SelectCtx)!;
  if (!ctx.open) return null;
  return (
    <div className="relative">
      <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-card p-1">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(SelectCtx)!;
  const onClick = () => {
    ctx.onChange?.(value);
    ctx.setOpen(false);
  };
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-[#1A1D24]"
    >
      {children}
    </div>
  );
}
