import { baseApi } from '@/shared/api/baseApi';
import type { ListEnvelope } from '@/shared/api/baseApi';
import type { ListRecipesParams, RecipeSummary } from '../model/types';

export const recipeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listRecipes: build.query<ListEnvelope<RecipeSummary>, ListRecipesParams | void>({
      query: (params) => ({ url: '/recipes', params: params ?? undefined }),
      providesTags: (res) => [
        'Recipe',
        ...(res?.data ?? []).map((r) => ({ type: 'Recipe' as const, id: r.id })),
      ],
    }),
  }),
});

export const { useListRecipesQuery } = recipeApi;
