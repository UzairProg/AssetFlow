import type { PropsWithChildren, ReactNode } from 'react'

import { motion } from 'framer-motion'
import { ShieldCheck, Clock3, BadgeCheck } from 'lucide-react'

import AuthCard from '../AuthCard/AuthCard'
import AuthFooter from '../AuthFooter/AuthFooter'
import AuthHeader from '../AuthHeader/AuthHeader'
import AuthIllustration from '../AuthIllustration/AuthIllustration'

type AuthLayoutProps = PropsWithChildren<{
  title: string
  subtitle: string
  footer?: ReactNode
  note?: string
}>

const supportItems = [
  {
    label: 'Secure sessions',
    value: 'Enterprise SSO ready',
    icon: ShieldCheck,
  },
  {
    label: 'Fast access',
    value: 'Average sign in under 30s',
    icon: Clock3,
  },
  {
    label: 'Trusted controls',
    value: 'Role aware by design',
    icon: BadgeCheck,
  },
]

const AuthLayout = ({ title, subtitle, footer, note, children }: AuthLayoutProps) => {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex w-full max-w-lg flex-col items-stretch gap-6"
      >
        <AuthHeader title={title} subtitle={subtitle} />
        <AuthIllustration />

        <div className="grid gap-3 sm:grid-cols-3">
          {supportItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <Icon className="h-4 w-4 text-blue-900" />
                  {item.label}
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-900">
                  {item.value}
                </p>
              </div>
            )
          })}
        </div>

        <AuthCard>{children}</AuthCard>

        {note ? (
          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900 shadow-sm">
            {note}
          </div>
        ) : null}

        {footer ?? <AuthFooter />}
      </motion.div>
    </main>
  )
}

export default AuthLayout
