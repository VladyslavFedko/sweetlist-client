import { baseApi } from '@/shared/api/baseApi';
import type { DataEnvelope } from '@/shared/api/baseApi';
import type { User } from '../model/types';

export type UpdateMePayload = Partial<Pick<User, 'name' | 'language' | 'theme' | 'cloudSyncEnabled'>>;

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => '/users/me',
      transformResponse: (res: DataEnvelope<User>) => res.data,
      providesTags: ['Me'],
    }),
    updateMe: build.mutation<User, UpdateMePayload>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      transformResponse: (res: DataEnvelope<User>) => res.data,
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation } = sessionApi;
