import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, KeyRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import PasswordField from '../../../components/auth/PasswordField'
import PasswordStrength from '../../../components/auth/PasswordStrength'
import { goToDemoDashboard } from '../../../lib/demoAuth'

type ResetPasswordFormValues = {
  newPassword: string
  confirmPassword: string
}

const resetSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const ResetPassword = () => {
  const [success, setSuccess] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async () => {
    setSuccess(true)
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your AssetFlow account."
      note="Choose a strong password that meets company policy and is not used on other internal systems."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          label="New Password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          registration={register('newPassword')}
          error={errors.newPassword?.message}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Repeat the new password"
          autoComplete="new-password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <PasswordStrength value={watch('newPassword')} />

        {success ? (
          <div className="auth-success-pop rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Password updated successfully.
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
          {[
            { label: 'Length', value: 'At least 8 characters' },
            { label: 'Complexity', value: 'Mix letters, numbers, and symbols' },
            { label: 'Reuse', value: 'Do not reuse previous passwords' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-1">
          <AuthButton type="submit" fullWidth loading={isSubmitting}>
            <KeyRound className="h-4 w-4" />
            Reset Password
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            Continue as Demo
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ResetPassword
