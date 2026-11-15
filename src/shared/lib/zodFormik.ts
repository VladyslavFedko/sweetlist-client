import type { TFunction } from 'i18next';
import type { ZodTypeAny } from 'zod';

/**
 * Formik `validate` adapter. Schema messages are i18n keys, so errors are translated
 * at validation time and follow the current language.
 */
export function zodValidate<S extends ZodTypeAny>(schema: S, t: TFunction) {
  return (values: unknown): Record<string, string> => {
    const result = schema.safeParse(values);
    if (result.success) return {};
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? '');
      if (field && !errors[field]) errors[field] = t(issue.message);
    }
    return errors;
  };
}
