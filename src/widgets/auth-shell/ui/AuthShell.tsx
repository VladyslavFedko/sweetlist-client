import type { ReactNode } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LanguageSelect } from '@/features/switch-language';
import { Logo } from '@/shared/ui/Logo';

type Mode = 'login' | 'register';

/**
 * Optional illustration: export Figma node 12:10464 ("Pastry illustration") as SVG to
 * `public/illustrations/pastry.svg`. If the file is missing the panel simply omits it.
 */
function PastryIllustration() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <img
      src="/illustrations/pastry.svg"
      alt=""
      onError={() => setVisible(false)}
      className="mx-auto h-[340px] w-[480px] max-w-full object-contain"
    />
  );
}

export function AuthShell({ mode, children }: { mode: Mode; children: ReactNode }) {
  const { t } = useTranslation();

  const tab = (to: string, label: string, active: boolean) => (
    <NavLink
      to={to}
      replace
      aria-current={active ? 'page' : undefined}
      className={[
        'flex h-10 flex-1 items-center justify-center rounded-[10px] text-base',
        active ? 'bg-accent-tint font-extrabold text-ink' : 'text-ink-muted hover:text-ink',
      ].join(' ')}
    >
      {label}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen gap-8 bg-warm p-4 lg:p-8">
      <aside
        className="hidden w-[608px] shrink-0 flex-col justify-between rounded-r24 p-10 lg:flex"
        style={{ background: 'linear-gradient(to bottom, var(--welcome-from), var(--welcome-to))' }}
      >
        <Logo />
        <div className="flex flex-col gap-8">
          <PastryIllustration />
          <div className="flex flex-col gap-4">
            <p className="text-[32px] font-extrabold leading-10 text-ink">
              {t('auth.panel.line1')}
              <br />
              {t('auth.panel.line2')}
            </p>
            <p className="text-base text-brown">{t('auth.panel.text')}</p>
          </div>
        </div>
        <p className="text-[13px] text-brown">{t('auth.panel.footer')}</p>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col items-center justify-between gap-6 py-2 lg:px-8">
        <div className="flex w-full items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <LanguageSelect />
        </div>

        <div className="w-full max-w-[512px] rounded-r24 bg-card p-6 shadow-form sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-[32px] font-extrabold leading-10 text-ink">{t('auth.title')}</h1>
              <p className="text-base text-ink-muted">{t('auth.subtitle')}</p>
            </div>

            <nav className="flex h-12 gap-1 rounded-r12 bg-warm p-1" aria-label={t('auth.title')}>
              {tab('/login', t('auth.tabs.login'), mode === 'login')}
              {tab('/register', t('auth.tabs.register'), mode === 'register')}
            </nav>

            {children}
          </div>
        </div>

        <p className="text-[13px] text-ink-muted">{t('auth.footer')}</p>
      </main>
    </div>
  );
}
