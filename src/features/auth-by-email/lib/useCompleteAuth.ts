import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/lib/redux';
import i18n from '@/shared/config/i18n';
import { setCredentials } from '@/entities/session';
import type { AuthResult } from '@/entities/session';

/** Stores the session, adopts the account's language and goes to the home page. */
export function useCompleteAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (result: AuthResult) => {
    dispatch(setCredentials(result));
    void i18n.changeLanguage(result.user.language);
    navigate('/', { replace: true });
  };
}
