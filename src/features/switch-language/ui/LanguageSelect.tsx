import { ChevronDown, Globe2 } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '@/shared/config/i18n';
import type { Language } from '@/shared/config/i18n';
import { selectUser, useUpdateMeMutation } from '@/entities/session';

/** Switches the UI language; for a signed-in user the choice is also saved to their profile. */
export function LanguageSelect() {
  const { t, i18n } = useTranslation();
  const user = useSelector(selectUser);
  const [updateMe] = useUpdateMeMutation();
  const current = (i18n.resolvedLanguage ?? 'uk') as Language;

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Language;
    void i18n.changeLanguage(next);
    if (user && user.language !== next) void updateMe({ language: next });
  };

  return (
    <label className="relative flex h-12 items-center gap-3 rounded-r12 bg-warm px-4 text-base font-semibold text-ink">
      <Globe2 size={20} aria-hidden />
      <span className="sr-only">{t('lang.label')}</span>
      <select
        value={current}
        onChange={onChange}
        className="cursor-pointer appearance-none bg-transparent pr-6 font-semibold outline-none"
      >
        {LANGUAGES.map((lng) => (
          <option key={lng} value={lng}>
            {t(`lang.${lng}`)}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4" aria-hidden />
    </label>
  );
}
