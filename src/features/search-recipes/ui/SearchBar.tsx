import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useTranslation();
  return (
    <label className="flex h-12 items-center gap-3 rounded-r12 bg-canvas px-4 focus-within:ring-2 focus-within:ring-accent">
      <Search size={20} className="text-ink-muted" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={100}
        placeholder={t('home.searchPlaceholder')}
        aria-label={t('home.searchPlaceholder')}
        className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
      />
    </label>
  );
}
