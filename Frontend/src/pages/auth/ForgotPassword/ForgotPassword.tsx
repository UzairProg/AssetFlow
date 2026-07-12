import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Mail, SendHorizontal } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import InputField from '../../../components/auth/InputField'
import { goToDemoDashboard } from '../../../lib/demoAuth'

type ForgotPasswordFormValues = {
  workEmail: string
}

const forgotSchema = z.object({
  workEmail: z.string().email('Enter a valid work email address'),
})

const ForgotPassword = () => {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { workEmail: '' },
  })

  const onSubmit = async () => {
    setSent(true)
  }

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your work email to receive reset instructions."
      note="If your organization uses SSO, your password may be managed by the identity provider instead of AssetFlow."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          autoComplete="email"
          registration={register('workEmail')}
          error={errors.workEmail?.message}
        />

        {sent ? (
          <div className="auth-success-pop rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Password reset email sent successfully.
            </div>
            <p className="mt-2 leading-6 text-green-700">
              Check your inbox for instructions to complete the reset process.
            </p>
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          Reset links are sent to the verified work inbox on file. For security, links expire after a short period.
        </div>

        <div className="space-y-3 pt-1">
          <AuthButton type="submit" fullWidth loading={isSubmitting}>
            <SendHorizontal className="h-4 w-4" />
            Send Reset Link
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            Continue as Demo
          </AuthButton>
        </div>
      </form>
    </AuthLayout>
  )
}

export default ForgotPassword
