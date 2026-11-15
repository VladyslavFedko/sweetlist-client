import { useId, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ label, error, type = 'text', className = '', ...rest }: TextFieldProps) {
  const id = useId();
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-bold leading-[1.4] text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={id}
          type={isPassword && revealed ? 'text' : type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full rounded-r12 bg-warm px-4 py-3 text-base text-ink outline-none transition-colors',
            'placeholder:text-ink-muted focus:ring-2 focus:ring-accent',
            error ? 'border-2 border-danger' : 'border-0',
            isPassword ? 'pr-12' : '',
            className,
          ].join(' ')}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? t('auth.hidePassword') : t('auth.showPassword')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-r8 p-1 text-ink-muted hover:text-ink"
          >
            {revealed ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
