export type Theme = 'light' | 'dark' | 'system';
export type UserLanguage = 'uk' | 'en';

/** Mirrors the backend `userView` (password hash is never sent). */
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  language: UserLanguage;
  theme: Theme;
  cloudSyncEnabled: boolean;
  lastSyncedAt: string | null;
  premiumUntil: string | null;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  user: User;
  token: string;
}
