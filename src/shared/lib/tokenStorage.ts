import { webStorage } from './storage';

const KEY = 'sweetlist.token';

export const tokenStorage = {
  get: () => webStorage.get(KEY),
  set: (token: string) => webStorage.set(KEY, token),
  clear: () => webStorage.remove(KEY),
};
