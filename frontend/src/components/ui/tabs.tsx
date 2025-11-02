import * as React from 'react';

type TabsCtx = { value: string; setValue: (v:string)=>void };
const Ctx = React.createContext<TabsCtx | null>(null);

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (v:string)=>void; children: React.ReactNode }) {
  return <Ctx.Provider value={{ value, setValue: onValueChange }}>{children}</Ctx.Provider>;
}
export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className='inline-flex gap-1 rounded-md border border-border p-1'>{children}</div>;
}
export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = React.useContext(Ctx)!;
  const active = ctx.value === value;
  return (
   <button
  onClick={() => ctx.setValue(value)}
  className="px-3 py-1.5 rounded-md text-sm"
>
  {children}
</button>

  );
}
export function TabsContent({ value, children, className='' }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(Ctx)!;
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
