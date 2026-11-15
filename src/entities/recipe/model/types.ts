export interface RecipeTag {
  id: string;
  name: string;
}

export interface RecipeAuthor {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
}

export type RecipeAccess = 'owner' | 'shared' | 'catalog';
export type ServingsUnit = 'portions' | 'pieces';
export type RecipeScope = 'mine' | 'received' | 'catalog';

/** Recipe as returned by `GET /recipes` (list items carry author + tags, no ingredients/steps). */
export interface RecipeSummary {
  id: string;
  title: string;
  description: string;
  photoUrl: string | null;
  prepTimeMinutes: number;
  restTimeMinutes: number;
  servings: number;
  servingsUnit: ServingsUnit;
  isPublished: boolean;
  tags?: RecipeTag[];
  author?: RecipeAuthor;
  access: RecipeAccess;
  createdAt: string;
  updatedAt: string;
}

export interface ListRecipesParams {
  scope?: RecipeScope;
  q?: string;
  tag?: string;
  sort?: 'newest' | 'oldest' | 'title' | 'time';
  page?: number;
  limit?: number; // backend max is 50
}
