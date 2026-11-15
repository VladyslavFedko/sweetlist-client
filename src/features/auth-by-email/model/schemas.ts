import { z } from 'zod';

// Mirrors backend `src/validators/auth.ts`. Messages are i18n keys (resolved by zodValidate).
const email = z
  .string()
  .trim()
  .min(1, 'validation.required')
  .email('validation.email')
  .max(255, 'validation.email');

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'validation.required'),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, 'validation.required').max(100, 'validation.nameMax'),
    email,
    password: z
      .string()
      .min(1, 'validation.required')
      .min(4, 'validation.passwordMin')
      .max(72, 'validation.passwordMax'),
    confirmPassword: z.string().min(1, 'validation.required'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'validation.passwordsMismatch',
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
