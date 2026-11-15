import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { setUnauthorizedHandler } from '@/shared/api/unauthorized';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import { logout, sessionReducer } from '@/entities/session';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    session: sessionReducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

// Keep the persisted token in sync with the session slice (reducers stay pure).
store.subscribe(() => {
  const { token } = store.getState().session;
  if (token) tokenStorage.set(token);
  else tokenStorage.clear();
});

// An expired/invalid token on any authorised request signs the user out.
setUnauthorizedHandler(() => {
  store.dispatch(logout());
  store.dispatch(baseApi.util.resetApiState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
