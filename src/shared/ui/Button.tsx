import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink-onAccent hover:bg-accent-pressed',
  secondary: 'bg-warm text-ink hover:bg-accent-tint',
  ghost: 'bg-transparent text-accent-pressed hover:bg-accent-tint',
};

export function Button({ variant = 'primary', loading, fullWidth, className = '', disabled, children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        'inline-flex h-12 items-center justify-center gap-2 rounded-r12 px-5 text-base font-bold transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-55',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
