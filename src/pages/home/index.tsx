import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectUser } from '@/entities/session';
import { SearchBar } from '@/features/search-recipes';
import { RecipeLibrary } from '@/widgets/recipe-library';

export function HomePage() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const [query, setQuery] = useState('');
  const firstName = user?.name.trim().split(/\s+/)[0] ?? '';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-extrabold leading-10 text-ink">{t('home.greeting', { name: firstName })}</h1>
          <p className="text-base text-ink-muted">{t('home.greetingSub')}</p>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>
      <RecipeLibrary query={query} />
    </div>
  );
}
