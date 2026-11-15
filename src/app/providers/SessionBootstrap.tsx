import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectUser, useGetMeQuery } from '@/entities/session';
import { FullScreenLoader } from '@/shared/ui/FullScreenLoader';

/** If a token is stored, load the profile before rendering routes so guards don't flash. */
export function SessionBootstrap({ children }: { children: ReactNode }) {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const { isLoading } = useGetMeQuery(undefined, { skip: !token });

  if (token && !user && isLoading) return <FullScreenLoader />;
  return <>{children}</>;
}
