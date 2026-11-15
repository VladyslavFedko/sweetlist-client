import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function ComingSoonPage() {
  const { t } = useTranslation();
  return (
    <div className="flex max-w-md flex-col items-start gap-3">
      <h1 className="text-[32px] font-extrabold leading-10 text-ink">{t('comingSoon.title')}</h1>
      <p className="text-base text-ink-muted">{t('comingSoon.text')}</p>
      <Link to="/" className="font-bold text-accent-pressed hover:underline">
        {t('comingSoon.back')}
      </Link>
    </div>
  );
}
