import * as React from "react";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const MenuCtx = React.createContext<Ctx | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <MenuCtx.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </MenuCtx.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
}: {
  children: React.ReactElement | React.ReactNode;
  asChild?: boolean;
}) {
  const ctx = React.useContext(MenuCtx)!;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        (children as any).props?.onClick?.(e);
        ctx.setOpen(!ctx.open);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className="inline-flex items-center"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "start",
  className = "",
}: {
  children: React.ReactNode;
  align?: "start" | "end";
  className?: string;
}) {
  const ctx = React.useContext(MenuCtx)!;
  if (!ctx.open) return null;

  return (
    <div
      className={`absolute z-50 mt-2 min-w-[10rem] rounded-md border border-border bg-card p-1 text-sm shadow ${className}`}
      style={{ right: align === "end" ? 0 : "auto" }}
      role="menu"
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ctx = React.useContext(MenuCtx)!;
  const handle = () => {
    onClick?.();
    ctx.setOpen(false);
  };
  return (
    <div
      role="menuitem"
      onClick={handle}
      className={`cursor-pointer select-none rounded px-2 py-1.5 hover:bg-muted ${className}`}
    >
      {children}
    </div>
  );
}
