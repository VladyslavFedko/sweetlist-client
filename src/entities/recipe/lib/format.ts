import type { TFunction } from 'i18next';

/** 150 -> "2 год 30 хв" / "2 h 30 min". */
export function formatDuration(totalMinutes: number, t: TFunction): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (hours) parts.push(t('time.hours', { count: hours }));
  if (minutes || !hours) parts.push(t('time.minutes', { count: minutes }));
  return parts.join(' ');
}
