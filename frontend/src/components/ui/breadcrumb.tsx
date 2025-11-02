import * as React from 'react';

export function Breadcrumb({ className='', ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label='Breadcrumb' className={className} {...props} />;
}
export function BreadcrumbList({ className='', ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={\lex items-center gap-2 text-sm \\} {...props} />;
}
export function BreadcrumbItem({ className='', ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={className} {...props} />;
}
export function BreadcrumbSeparator() {
  return <span className='text-muted'>/</span>;
}
export function BreadcrumbLink({ className='', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={\	ext-muted hover:text-white \\} {...props} />;
}
export function BreadcrumbPage({ className='', ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={\	ext-white \\} {...props} />;
}
