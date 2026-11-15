import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RecipeCard, useListRecipesQuery } from '@/entities/recipe';
import { useDebouncedValue } from '@/shared/lib/useDebouncedValue';
import { Button } from '@/shared/ui/Button';
import { Chip } from '@/shared/ui/Chip';

const addLink =
  'inline-flex h-12 items-center justify-center rounded-r12 bg-accent px-5 text-base font-bold text-ink-onAccent hover:bg-accent-pressed';

function InviteCard() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center gap-4 rounded-r24 bg-accent-tint p-8">
      <p className="text-2xl font-extrabold text-ink">{t('home.inviteTitle')}</p>
      <p className="text-base text-ink-muted">{t('home.inviteText')}</p>
      <Link to="/recipes/new" className={`${addLink} self-start`}>
        {t('home.addRecipeShort')}
      </Link>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-[360px] animate-pulse rounded-r24 bg-card" />
      ))}
    </div>
  );
}

export function RecipeLibrary({ query }: { query: string }) {
  const { t } = useTranslation();
  const debounced = useDebouncedValue(query.trim());
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Backend page size is capped at 50; the tag filter is applied client-side on that page.
  const { data, isLoading, isFetching, isError, refetch } = useListRecipesQuery({
    scope: 'mine',
    sort: 'newest',
    limit: 50,
    q: debounced || undefined,
  });

  const recipes = data?.data ?? [];
  const tags = useMemo(() => {
    const seen = new Map<string, string>();
    for (const r of recipes) for (const tag of r.tags ?? []) seen.set(tag.name.toLowerCase(), tag.name);
    return [...seen.values()];
  }, [recipes]);

  const visible = activeTag
    ? recipes.filter((r) => r.tags?.some((tag) => tag.name.toLowerCase() === activeTag.toLowerCase()))
    : recipes;

  return (
    <section aria-busy={isFetching} className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-2xl font-extrabold text-ink">{t('home.sectionTitle')}</h2>
          {!isLoading && !isError && (
            <p className="text-[13px] text-ink-muted">{t('home.recipesCount', { count: visible.length })}</p>
          )}
        </div>
        <Link to="/recipes/new" className={addLink}>
          {t('home.addRecipe')}
        </Link>
      </div>

      {tags.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="group">
          <Chip selected={activeTag === null} onClick={() => setActiveTag(null)}>
            {t('home.all')} · {recipes.length}
          </Chip>
          {tags.map((tag) => (
            <Chip key={tag} selected={activeTag === tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)}>
              {tag}
            </Chip>
          ))}
        </div>
      )}

      {isLoading && <SkeletonGrid />}

      {isError && (
        <div className="flex flex-col items-start gap-3 rounded-r24 bg-card p-8">
          <p className="text-base text-ink">{t('home.loadError')}</p>
          <Button variant="secondary" onClick={() => void refetch()}>
            {t('home.retry')}
          </Button>
        </div>
      )}

      {!isLoading && !isError && visible.length === 0 && (
        debounced ? (
          <p className="text-base text-ink-muted">{t('home.emptySearch')}</p>
        ) : (
          <InviteCard />
        )
      )}

      {visible.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          <InviteCard />
        </div>
      )}
    </section>
  );
}
