import { zodResolver } from '@hookform/resolvers/zod'
import { Building2, CheckCircle2, UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import Divider from '../../../components/auth/Divider'
import InputField from '../../../components/auth/InputField'
import PasswordField from '../../../components/auth/PasswordField'
import PasswordStrength from '../../../components/auth/PasswordStrength'
import { goToDemoDashboard, goToPath } from '../../../lib/demoAuth'

type SignupFormValues = {
  fullName: string
  workEmail: string
  password: string
  confirmPassword: string
  department: string
  acceptTerms: boolean
}

const signupSchema = z
  .object({
    fullName: z.string().min(3, 'Enter your full name'),
    workEmail: z.string().email('Enter a valid work email address'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
    department: z.string().optional(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: 'You must accept the terms to continue' }),
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const Signup = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      workEmail: '',
      password: '',
      confirmPassword: '',
      department: 'employee-access',
      acceptTerms: false,
    },
  })

  const passwordValue = watch('password')

  const onSubmit = async () => {
    goToDemoDashboard()
  }

  return (
    <AuthLayout
      title="Create Employee Account"
      subtitle="Register as an employee. Roles are assigned later by your administrator."
      note="Employee registrations are kept intentionally lightweight. Access permissions are assigned after approval."
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Full Name"
          placeholder="Jane Doe"
          icon={UserPlus}
          autoComplete="name"
          registration={register('fullName')}
          error={errors.fullName?.message}
        />

        <InputField
          label="Work Email"
          type="email"
          placeholder="name@company.com"
          icon={UserPlus}
          autoComplete="email"
          registration={register('workEmail')}
          error={errors.workEmail?.message}
        />

        <PasswordField
          label="Password"
          placeholder="Create a strong password"
          autoComplete="new-password"
          registration={register('password')}
          error={errors.password?.message}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Repeat the password"
          autoComplete="new-password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Department</label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-400">
            <Building2 className="h-4 w-4 text-blue-900" />
            <select
              className="w-full bg-transparent text-slate-400 outline-none"
              disabled
              value="employee-access"
            >
              <option value="employee-access">Employee Access Only</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <PasswordStrength value={passwordValue} />

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-900 focus:ring-blue-500/20"
              {...register('acceptTerms')}
            />
            <span>
              I accept the terms and understand that employee accounts are provisioned with limited access.
            </span>
          </label>
          {errors.acceptTerms?.message ? (
            <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
          ) : null}
        </div>

        <div className="space-y-3 pt-1">
          <AuthButton type="submit" fullWidth loading={isSubmitting}>
            <CheckCircle2 className="h-4 w-4" />
            Create Account
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            <CheckCircle2 className="h-4 w-4" />
            Continue as Demo
          </AuthButton>
        </div>

        <Divider />

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
          Accounts created here receive Employee access only. Department Heads and Asset Managers are assigned later by the Administrator.
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          {[
            { label: 'Account type', value: 'Employee access only' },
            { label: 'Review path', value: 'Assigned by administrator' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-500">
          <span>Already have an account?</span>
          <button
            type="button"
            onClick={() => goToPath('/login')}
            className="font-semibold text-blue-900 transition hover:text-blue-700"
          >
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default Signup
