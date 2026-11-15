import { BookOpen, Cloud, CloudOff, Home, ShoppingBasket, UserRound, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LanguageSelect } from '@/features/switch-language';
import { LogoutButton } from '@/features/logout';
import { selectUser } from '@/entities/session';
import { Avatar } from '@/shared/ui/Avatar';
import { FullScreenLoader } from '@/shared/ui/FullScreenLoader';
import { Logo } from '@/shared/ui/Logo';

const NAV: { to: string; key: string; icon: LucideIcon; end?: boolean }[] = [
  { to: '/', key: 'home', icon: Home, end: true },
  { to: '/shopping', key: 'shopping', icon: ShoppingBasket },
  { to: '/recipes', key: 'recipes', icon: BookOpen },
  { to: '/community', key: 'community', icon: Users },
  { to: '/profile', key: 'profile', icon: UserRound },
];

export function AppShell() {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const { pathname } = useLocation();
  if (!user) return <FullScreenLoader />;

  const SyncIcon = user.cloudSyncEnabled ? Cloud : CloudOff;

  return (
    <div className="flex min-h-screen bg-warm">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[216px] shrink-0 flex-col gap-10 bg-canvas px-4 py-8 lg:flex">
        <Logo />
        <nav aria-label={t('nav.main')} className="flex flex-col gap-2">
          {NAV.map(({ to, key, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex h-12 items-center gap-3 rounded-r12 px-4 text-base text-ink',
                  isActive ? 'bg-accent-tint font-extrabold' : 'bg-card font-medium hover:bg-warm',
                ].join(' ')
              }
            >
              <Icon size={20} aria-hidden />
              {t(`nav.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-r16 bg-warm p-4">
            <Cloud size={24} className="text-accent" aria-hidden />
            <p className="text-[13px] font-bold leading-[1.4] text-ink">{t('home.noteTitle')}</p>
            <p className="text-[13px] leading-[1.4] text-ink-muted">{t('home.noteText')}</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar name={user.name} src={user.avatarUrl} />
            <div className="min-w-0 flex-1 text-[13px] leading-[1.4]">
              <p className="truncate font-bold text-ink">{user.name}</p>
              <p className="truncate text-ink-muted">{t('home.profileRole')}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8 lg:pb-0 lg:pt-8">
          <div className="lg:hidden">
            <Logo />
          </div>
          <p className="hidden text-[13px] text-ink-muted lg:block">{pathname === '/' ? t('home.breadcrumb') : ''}</p>
          <div className="flex items-center gap-4">
            <span className="hidden h-8 items-center gap-2 rounded-full bg-warm px-3 text-[13px] text-ink md:inline-flex">
              <SyncIcon size={16} aria-hidden />
              {user.cloudSyncEnabled ? t('sync.cloud') : t('sync.local')}
            </span>
            <LanguageSelect />
            <div className="lg:hidden">
              <LogoutButton />
            </div>
            <div className="hidden lg:block">
              <Avatar name={user.name} src={user.avatarUrl} />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-28 pt-6 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        aria-label={t('nav.main')}
        className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-line bg-canvas px-2 py-2 lg:hidden"
      >
        {NAV.map(({ to, key, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              [
                'flex min-w-0 flex-1 flex-col items-center gap-1 rounded-r12 py-1.5 text-[11px]',
                isActive ? 'bg-accent-tint font-bold text-ink' : 'text-ink-muted',
              ].join(' ')
            }
          >
            <Icon size={20} aria-hidden />
            <span className="truncate">{t(`nav.${key}`)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
