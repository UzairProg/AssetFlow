import { LayoutDashboard, LogOut, ShieldCheck, Users } from 'lucide-react'

import { motion } from 'framer-motion'

import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import { goToPath } from '../../lib/demoAuth'

const DashboardPage = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="A reusable enterprise shell for dashboards, workspaces, and operational pages."
      actions={(
        <button
          type="button"
          onClick={() => goToPath('/login')}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <LogOut className="h-4 w-4" />
          Back to Login
        </button>
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex w-full flex-col gap-6"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-900" />
                Demo access
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">AssetFlow Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                This is the temporary demo destination for the authentication flow while backend APIs are under development.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Active Users', value: '1,284', icon: Users },
            { label: 'Open Requests', value: '42', icon: LayoutDashboard },
            { label: 'Security Score', value: '99.9%', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Icon className="h-5 w-5 text-blue-900" />
                <p className="mt-4 text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
              </div>
            )
          })}
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default DashboardPage
