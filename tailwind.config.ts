import type { Config } from 'tailwindcss';

/**
 * All colors come from CSS variables (src/app/styles/_tokens.scss), so light/dark
 * switching needs no `dark:` variants. Token names mirror the Figma variables.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--accent-primary)',
          tint: 'var(--accent-tint)',
          pressed: 'var(--accent-pressed)',
        },
        warm: 'var(--background-warm)',
        canvas: 'var(--background-canvas)',
        card: 'var(--surface-card)',
        elevated: 'var(--surface-elevated)',
        ink: {
          DEFAULT: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          onAccent: 'var(--text-on-accent)',
        },
        line: 'var(--border-subtle)',
        danger: 'var(--status-error)',
        brown: 'var(--welcome-text)',
      },
      borderRadius: { r8: '8px', r12: '12px', r16: '16px', r20: '20px', r24: '24px' },
      fontFamily: { sans: ['Nunito', 'system-ui', 'sans-serif'] },
      boxShadow: {
        card: '0 4px 20px rgba(68,39,15,0.04)',
        form: '0 4px 20px rgba(68,39,15,0.03)',
        dock: '0 8px 32px rgba(0,0,0,0.08)',
      },
    },
  },
} satisfies Config;
