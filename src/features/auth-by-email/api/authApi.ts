import { baseApi } from '@/shared/api/baseApi';
import type { DataEnvelope } from '@/shared/api/baseApi';
import type { AuthResult } from '@/entities/session';
import type { LoginValues, RegisterValues } from '../model/schemas';

export interface RegisterPayload extends RegisterValues {
  language: 'uk' | 'en';
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResult, LoginValues>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      transformResponse: (res: DataEnvelope<AuthResult>) => res.data,
    }),
    register: build.mutation<AuthResult, RegisterPayload>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      transformResponse: (res: DataEnvelope<AuthResult>) => res.data,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
