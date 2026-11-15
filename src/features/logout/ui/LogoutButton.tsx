import { LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { baseApi } from '@/shared/api/baseApi';
import { useAppDispatch } from '@/shared/lib/redux';
import { logout } from '@/entities/session';

export function LogoutButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <button
      type="button"
      title={t('auth.signOut')}
      aria-label={t('auth.signOut')}
      onClick={() => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
      }}
      className="rounded-r8 p-2 text-ink-muted hover:bg-accent-tint hover:text-ink"
    >
      <LogOut size={18} aria-hidden />
    </button>
  );
}
