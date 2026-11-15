/**
 * Minimal key-value storage contract. The web build uses localStorage; the React Native app
 * can provide an implementation backed by SecureStore/AsyncStorage without touching callers.
 */
export interface KeyValueStorage {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

export const webStorage: KeyValueStorage = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* storage unavailable (private mode) – session lives in memory only */
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
