import { ShieldCheck } from 'lucide-react'

const SecurityBadge = () => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
      <ShieldCheck className="h-3.5 w-3.5 text-blue-900" />
      Enterprise Secure Access
    </div>
  )
}

export default SecurityBadge
