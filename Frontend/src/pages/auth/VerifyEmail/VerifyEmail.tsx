import { useEffect, useMemo, useState } from 'react'

import { CheckCircle2, MailCheck, RotateCcw } from 'lucide-react'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import OTPInput from '../../../components/auth/OTPInput'
import { goToDemoDashboard } from '../../../lib/demoAuth'

const VerifyEmail = () => {
  const [code, setCode] = useState('')
  const [timer, setTimer] = useState(45)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (timer <= 0) return

    const interval = window.setInterval(() => setTimer((value) => Math.max(value - 1, 0)), 1000)
    return () => window.clearInterval(interval)
  }, [timer])

  const timerLabel = useMemo(() => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, [timer])

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the 6-digit verification code sent to your email."
      note="Verification links and codes are used to protect account access and confirm work email ownership."
    >
      <div className="space-y-5">
        <OTPInput label="Verification Code" value={code} onChange={setCode} />

        {verified ? (
          <div className="auth-success-pop rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Email verified successfully.
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">Resend available in <span className="font-semibold text-slate-900">{timerLabel}</span></p>
          <button
            type="button"
            onClick={() => setTimer(45)}
            disabled={timer > 0}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-900 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            <RotateCcw className="h-4 w-4" />
            Resend Code
          </button>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
          {[
            { label: 'Delivery', value: 'Check inbox and spam folder' },
            { label: 'Timing', value: 'Codes expire automatically' },
            { label: 'Security', value: 'One-time use for login safety' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              <p className="text-sm font-medium leading-6 text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-1">
          <AuthButton type="button" fullWidth onClick={() => setVerified(true)}>
            <MailCheck className="h-4 w-4" />
            Verify
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            Continue as Demo
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  )
}

export default VerifyEmail
