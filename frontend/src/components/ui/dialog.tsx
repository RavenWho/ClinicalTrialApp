import * as React from 'react';

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v:boolean)=>void; children: React.ReactNode }) {
  React.useEffect(() => {
    function onEsc(e: KeyboardEvent){ if (e.key === 'Escape') onOpenChange(false); }
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onOpenChange]);
  return <>{open && children}</>;
}
export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='fixed inset-0 z-50 grid place-items-center'>
      <div className='fixed inset-0 bg-black/60' />
      <div className='relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-5'>{children}</div>
    </div>
  );
}
export function DialogHeader({ children }: { children: React.ReactNode }) { return <div className='mb-3'>{children}</div>; }
export function DialogTitle({ children }: { children: React.ReactNode }) { return <h3 className='text-lg font-semibold'>{children}</h3>; }
export function DialogDescription({ children }: { children: React.ReactNode }) { return <p className='text-sm text-muted'>{children}</p>; }
export function DialogFooter({ children }: { children: React.ReactNode }) { return <div className='mt-4 flex justify-end gap-2'>{children}</div>; }
