import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

import { cn } from '../../../components/landing/shared'

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  registration?: UseFormRegisterReturn
}

const PasswordField = ({ label, error, registration, id, className, ...props }: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false)
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
        <ShieldCheck className="h-4 w-4 text-blue-900" />
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={cn('w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400', className)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...registration}
          {...props}
        />
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => setVisible((current) => !current)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-900"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </motion.button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default PasswordField
