import { RegisterForm } from '@/features/auth-by-email';
import { AuthShell } from '@/widgets/auth-shell';

export function RegisterPage() {
  return (
    <AuthShell mode="register">
      <RegisterForm />
    </AuthShell>
  );
}
