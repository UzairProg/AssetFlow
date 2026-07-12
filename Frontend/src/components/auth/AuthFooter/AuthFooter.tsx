import { ChevronRight } from 'lucide-react'

const AuthFooter = () => {
  return (
    <div className="flex flex-col items-center gap-4 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
      <p>Need help accessing your account?</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="#" className="inline-flex items-center gap-1 font-medium text-blue-900 transition hover:text-blue-700">
          Security
          <ChevronRight className="h-3.5 w-3.5" />
        </a>
        <a href="#" className="font-medium text-blue-900 transition hover:text-blue-700">
          Privacy
        </a>
        <a href="#" className="font-medium text-blue-900 transition hover:text-blue-700">
          Terms
        </a>
      </div>
    </div>
  )
}

export default AuthFooter
