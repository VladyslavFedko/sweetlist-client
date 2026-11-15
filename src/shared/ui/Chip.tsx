import type { ButtonHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Filter chip (button). For a static tag, use <TagPill>. */
export function Chip({ selected, children, className = '', ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...rest}
      className={[
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] text-ink',
        selected ? 'bg-accent-tint font-bold' : 'bg-warm hover:bg-accent-tint',
        className,
      ].join(' ')}
    >
      {selected && <Check size={14} aria-hidden />}
      {children}
    </button>
  );
}

export function TagPill({ children }: { children: string }) {
  return <span className="inline-flex h-8 items-center rounded-full bg-warm px-3 text-[13px] text-ink">{children}</span>;
}
