import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, LogIn, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import Divider from '../../../components/auth/Divider'
import InputField from '../../../components/auth/InputField'
import PasswordField from '../../../components/auth/PasswordField'
import RememberMe from '../../../components/auth/RememberMe'
import SocialLogin from '../../../components/auth/SocialLogin'
import { goToDemoDashboard, goToPath } from '../../../lib/demoAuth'

type LoginFormValues = {
  workEmail: string
  password: string
}

const loginSchema = z.object({
  workEmail: z.string().email('Enter a valid work email address'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

const Login = () => {
  const [rememberMe, setRememberMe] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      workEmail: '',
      password: '',
    },
  })

  const onSubmit = async () => {
    goToDemoDashboard()
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue managing your organization's assets."
      note="Use your corporate credentials to access role-based workflows, approvals, and live asset visibility."
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

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          registration={register('password')}
          error={errors.password?.message}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <RememberMe checked={rememberMe} onChange={setRememberMe} />
          <button
            type="button"
            onClick={() => goToPath('/forgot-password')}
            className="text-sm font-medium text-blue-900 transition hover:text-blue-700"
          >
            Forgot Password?
          </button>
        </div>

        <div className="space-y-3 pt-1">
          <AuthButton type="submit" fullWidth loading={isSubmitting}>
            <LogIn className="h-4 w-4" />
            Sign In
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            <ArrowRight className="h-4 w-4" />
            Continue as Demo
          </AuthButton>
        </div>

        <Divider />
        <SocialLogin />

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
          {[
            { label: 'SSO ready', value: 'Enterprise identity support' },
            { label: 'Audit logs', value: 'Every access attempt tracked' },
            { label: 'Fast access', value: 'Workspace opens in seconds' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-500">
          <span>Don't have an account?</span>
          <button
            type="button"
            onClick={() => goToPath('/signup')}
            className="font-semibold text-blue-900 transition hover:text-blue-700"
          >
            Create Account
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Login
