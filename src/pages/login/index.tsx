import { LoginForm } from '@/features/auth-by-email';
import { AuthShell } from '@/widgets/auth-shell';

export function LoginPage() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
