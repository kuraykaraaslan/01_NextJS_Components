'use client';
import { cn } from '@/libs/utils/cn';
import { useFormContext, type RegisterOptions, type FieldValues, type Path } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  hint?: string;
  required?: boolean;
  rules?: RegisterOptions<T>;
  className?: string;
  children: (props: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean;
  }) => React.ReactNode;
};

// Wrapper that connects a react-hook-form field to accessible label/error/hint
// markup. Use inside a <FormProvider> context from react-hook-form.
export function FormField<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  rules,
  className,
  children,
}: FormFieldProps<T>) {
  const { register, formState: { errors } } = useFormContext<T>();
  const error = errors[name];
  const errorMessage = typeof error?.message === 'string' ? error.message : undefined;
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = errorMessage ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  // Register is called here so callers don't need to wire it manually.
  // The returned ref/name/onChange/onBlur are passed via render-prop pattern.
  void register(name, rules);

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={name}
        className={cn(
          'text-sm font-medium text-text-primary',
          required && "after:content-['*'] after:ml-0.5 after:text-error",
        )}
      >
        {label}
      </label>

      {children({
        id: name,
        'aria-describedby': describedBy,
        'aria-invalid': !!errorMessage,
      })}

      {hint && !errorMessage && (
        <p id={hintId} className="text-xs text-text-secondary">
          {hint}
        </p>
      )}

      {errorMessage && (
        <p id={errorId} role="alert" className="text-xs text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
