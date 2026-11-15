import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { parseApiError } from '@/shared/api/errors';
import { zodValidate } from '@/shared/lib/zodFormik';
import { useLoginMutation } from '../api/authApi';
import { loginSchema } from '../model/schemas';
import type { LoginValues } from '../model/schemas';
import { useCompleteAuth } from '../lib/useCompleteAuth';

export function LoginForm() {
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const completeAuth = useCompleteAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const formik = useFormik<LoginValues>({
    initialValues: { email: '', password: '' },
    validate: zodValidate(loginSchema, t),
    onSubmit: async (values) => {
      setFormError(null);
      try {
        completeAuth(await login(values).unwrap());
      } catch (err) {
        const { status, code } = parseApiError(err);
        setFormError(status === 401 ? t('auth.invalidCredentials') : t([`errors.${code}`, 'errors.UNKNOWN']));
      }
    },
  });

  const err = (field: keyof LoginValues) => (formik.touched[field] ? formik.errors[field] : undefined);

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <TextField
          label={t('auth.fields.email')}
          type="email"
          autoComplete="email"
          placeholder={t('auth.fields.emailPlaceholder')}
          {...formik.getFieldProps('email')}
          error={err('email')}
        />
        <TextField
          label={t('auth.fields.password')}
          type="password"
          autoComplete="current-password"
          {...formik.getFieldProps('password')}
          error={err('password')}
        />
      </div>
      {formError && (
        <p role="alert" className="text-[13px] text-danger">
          {formError}
        </p>
      )}
      <Button type="submit" fullWidth loading={isLoading}>
        {t('auth.submit.login')}
      </Button>
    </form>
  );
}
