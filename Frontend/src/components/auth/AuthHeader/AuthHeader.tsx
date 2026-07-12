import { LockKeyhole } from 'lucide-react'

import SecurityBadge from '../SecurityBadge/SecurityBadge'

const AuthHeader = ({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) => {
  return (
    <div className="space-y-5 text-center">
      <div className="flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-900 bg-blue-900 text-white shadow-sm">
          <LockKeyhole className="h-5 w-5" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-center">
          <SecurityBadge />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default AuthHeader
