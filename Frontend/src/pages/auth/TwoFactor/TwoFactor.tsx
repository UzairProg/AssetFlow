import { useState } from 'react'

import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'

import AuthButton from '../../../components/auth/AuthButton'
import AuthLayout from '../../../components/auth/AuthLayout'
import OTPInput from '../../../components/auth/OTPInput'
import RememberMe from '../../../components/auth/RememberMe'
import { goToDemoDashboard } from '../../../lib/demoAuth'

const TwoFactor = () => {
  const [code, setCode] = useState('')
  const [rememberDevice, setRememberDevice] = useState(false)
  const [verified, setVerified] = useState(false)

  return (
    <AuthLayout
      title="Two-Factor Authentication"
      subtitle="Enter the verification code from your Authenticator App."
      note="Two-factor authentication is required for privileged access and high-risk actions."
    >
      <div className="space-y-5">
        <OTPInput label="Authenticator Code" value={code} onChange={setCode} />

        <div className="flex items-center justify-between gap-4">
          <RememberMe checked={rememberDevice} onChange={setRememberDevice} />
          <button
            type="button"
            className="text-sm font-medium text-blue-900 transition hover:text-blue-700"
          >
            Recovery code
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          Trusted devices reduce repeated prompts, but access is still monitored and logged for enterprise compliance.
        </div>

        {verified ? (
          <div className="auth-success-pop rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              Two-factor authentication verified.
            </div>
          </div>
        ) : null}

        <div className="space-y-3 pt-1">
          <AuthButton type="button" fullWidth onClick={() => setVerified(true)}>
            <ShieldCheck className="h-4 w-4" />
            Verify
          </AuthButton>
          <AuthButton type="button" variant="secondary" fullWidth onClick={goToDemoDashboard}>
            <Sparkles className="h-4 w-4" />
            Continue as Demo
          </AuthButton>
        </div>
      </div>
    </AuthLayout>
  )
}

export default TwoFactor
