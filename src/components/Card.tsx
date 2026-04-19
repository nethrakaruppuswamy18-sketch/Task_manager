import { ReactNode } from 'react';
import { cn } from '../lib/utils.ts';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
}

export function Card({
  children,
  className,
  title,
  description,
  headerAction,
  footer,
}: CardProps) {
  return (
    <div className={cn('bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden', className)}>
      {(title || description || headerAction) && (
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-4">
            <div>
              {title && <h3 className="text-lg font-semibold text-slate-900 leading-none">{title}</h3>}
              {description && <p className="mt-1.5 text-sm text-slate-500">{description}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">{footer}</div>}
    </div>
  );
}
