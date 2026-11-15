import { ChefHat } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { assetUrl } from '@/shared/config/env';
import { TagPill } from '@/shared/ui/Chip';
import { formatDuration } from '../lib/format';
import type { RecipeSummary } from '../model/types';

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  const { t } = useTranslation();
  const photo = assetUrl(recipe.photoUrl);
  const servings = t(`recipe.servings.${recipe.servingsUnit}`, { count: recipe.servings });

  return (
    <article className="flex flex-col gap-2 rounded-r24 border border-line bg-card p-3 shadow-card">
      <div className="h-[164px] overflow-hidden rounded-r16 bg-accent-tint">
        {photo ? (
          <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-accent">
            <ChefHat size={40} aria-hidden />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-lg font-bold leading-normal text-ink">{recipe.title}</h3>
        <p className="text-[13px] text-ink-muted">
          {formatDuration(recipe.prepTimeMinutes, t)} · {servings}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {recipe.tags?.slice(0, 3).map((tag) => <TagPill key={tag.id}>{tag.name}</TagPill>)}
      </div>

      <Link
        to={`/recipes/${recipe.id}`}
        className="mt-auto inline-flex h-12 items-center justify-center rounded-r12 bg-warm px-5 text-base font-bold text-ink hover:bg-accent-tint"
      >
        {t('recipe.view')}
      </Link>
    </article>
  );
}
