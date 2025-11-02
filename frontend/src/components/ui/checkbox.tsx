import * as React from 'react';
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}
export function Checkbox({ className='', onCheckedChange, ...props }: CheckboxProps) {
  return (
    <input
      type='checkbox'
      className={\h-4 w-4 rounded border-border bg-[#0B0C0F] text-brand focus:ring-brand \\}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      {...props}
    />
  );
}
export default Checkbox;
