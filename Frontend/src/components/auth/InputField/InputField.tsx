import type { ComponentType, InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { cn } from '../../../components/landing/shared'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  icon?: ComponentType<{ className?: string }>
  registration?: UseFormRegisterReturn
}

const InputField = ({
  label,
  error,
  icon: Icon,
  registration,
  className,
  id,
  ...props
}: InputFieldProps) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15',
          error && 'border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15',
        )}
      >
        {Icon ? <Icon className="h-4 w-4 text-blue-900" /> : null}
        <input
          id={inputId}
          className={cn(
            'w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400',
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...registration}
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default InputField
