import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { env } from '@/shared/config/env';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import { notifyUnauthorized } from './unauthorized';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${env.apiUrl}/api`,
  prepareHeaders: (headers) => {
    const token = tokenStorage.get();
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  // Only treat 401 as "session expired" when we actually sent a token (a wrong password on login is also 401).
  if (result.error?.status === 401 && tokenStorage.get()) notifyUnauthorized();
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Me', 'Recipe'],
  endpoints: () => ({}),
});

/** Backend envelope: `{ data: T }`; lists add `meta`. */
export interface DataEnvelope<T> {
  data: T;
}
export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface ListEnvelope<T> extends DataEnvelope<T[]> {
  meta: PageMeta;
}
