import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/** Backend error shape: `{ error: { code, message, details? } }`. */
export interface ParsedApiError {
  code: string;
  message: string;
  status: number | 'NETWORK';
}

export function parseApiError(err: unknown): ParsedApiError {
  const e = err as FetchBaseQueryError | undefined;
  if (e && typeof e === 'object' && 'status' in e) {
    if (typeof e.status === 'number') {
      const body = e.data as { error?: { code?: string; message?: string } } | undefined;
      return {
        status: e.status,
        code: body?.error?.code ?? `HTTP_${e.status}`,
        message: body?.error?.message ?? '',
      };
    }
    return { status: 'NETWORK', code: 'NETWORK_ERROR', message: '' };
  }
  return { status: 'NETWORK', code: 'UNKNOWN', message: '' };
}
