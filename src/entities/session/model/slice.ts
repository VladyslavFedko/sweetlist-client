import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import { sessionApi } from '../api/sessionApi';
import type { AuthResult, User } from './types';

interface SessionState {
  token: string | null;
  user: User | null;
}

const initialState: SessionState = { token: tokenStorage.get(), user: null };

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCredentials(state, { payload }: PayloadAction<AuthResult>) {
      state.token = payload.token;
      state.user = payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addMatcher(sessionApi.endpoints.updateMe.matchFulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { setCredentials, logout } = slice.actions;
export const sessionReducer = slice.reducer;

type WithSession = { session: SessionState };
export const selectToken = (s: WithSession) => s.session.token;
export const selectUser = (s: WithSession) => s.session.user;
