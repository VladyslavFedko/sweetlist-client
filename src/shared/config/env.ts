export const env = {
  /** Backend origin without trailing slash. */
  apiUrl: (import.meta.env.VITE_API_URL ?? 'http://localhost:5000').replace(/\/$/, ''),
};

/** Uploaded files (recipe photos, avatars) are served by the backend as relative `/uploads/...` paths. */
export function assetUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  return /^https?:\/\//.test(path) ? path : `${env.apiUrl}${path}`;
}
