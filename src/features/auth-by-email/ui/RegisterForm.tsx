import { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';
import { parseApiError } from '@/shared/api/errors';
import { zodValidate } from '@/shared/lib/zodFormik';
import { useRegisterMutation } from '../api/authApi';
import { registerSchema } from '../model/schemas';
import type { RegisterValues } from '../model/schemas';
import { useCompleteAuth } from '../lib/useCompleteAuth';

export function RegisterForm() {
  const { t, i18n } = useTranslation();
  const [register, { isLoading }] = useRegisterMutation();
  const completeAuth = useCompleteAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const formik = useFormik<RegisterValues>({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validate: zodValidate(registerSchema, t),
    onSubmit: async (values, helpers) => {
      setFormError(null);
      try {
        const language = i18n.resolvedLanguage === 'en' ? 'en' : 'uk';
        completeAuth(await register({ ...values, language }).unwrap());
      } catch (err) {
        const { code } = parseApiError(err);
        const message = t([`errors.${code}`, 'errors.UNKNOWN']);
        if (code === 'EMAIL_TAKEN') helpers.setFieldError('email', message);
        else setFormError(message);
      }
    },
  });

  const err = (field: keyof RegisterValues) =>
    formik.touched[field] ? formik.errors[field] : undefined;

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <TextField
          label={t('auth.fields.name')}
          autoComplete='name'
          placeholder={t('auth.fields.namePlaceholder')}
          {...formik.getFieldProps('name')}
          error={err('name')}
        />
        <TextField
          label={t('auth.fields.email')}
          type='email'
          autoComplete='email'
          placeholder={t('auth.fields.emailPlaceholder')}
          {...formik.getFieldProps('email')}
          error={err('email')}
        />
        <TextField
          label={t('auth.fields.password')}
          type='password'
          autoComplete='new-password'
          {...formik.getFieldProps('password')}
          error={err('password')}
        />
        <TextField
          label={t('auth.fields.confirmPassword')}
          type='password'
          autoComplete='new-password'
          {...formik.getFieldProps('confirmPassword')}
          error={err('confirmPassword')}
        />
      </div>
      {formError && (
        <p role='alert' className='text-[13px] text-danger'>
          {formError}
        </p>
      )}
      <Button type='submit' fullWidth loading={isLoading}>
        {t('auth.submit.register')}
      </Button>
    </form>
  );
}
