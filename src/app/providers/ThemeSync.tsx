import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/entities/session';

/** Applies the user's saved theme. "system" removes the attribute so the OS preference decides. */
export function ThemeSync() {
  const theme = useSelector(selectUser)?.theme;
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light' || theme === 'dark') root.dataset.theme = theme;
    else delete root.dataset.theme;
  }, [theme]);
  return null;
}
