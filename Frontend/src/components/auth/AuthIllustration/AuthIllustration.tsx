import { motion } from 'framer-motion'
import { CheckCircle2, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const AuthIllustration = () => {
  const tiles = [
    { label: 'Policies enforced', value: '128', icon: ShieldCheck },
    { label: 'Active sessions', value: '24', icon: LockKeyhole },
    { label: 'Security checks', value: '99.9%', icon: CheckCircle2 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Enterprise security</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">Trusted access controls</p>
        </div>
        <div className="rounded-full bg-blue-900 p-2 text-white shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {tiles.map((tile, index) => {
          const Icon = tile.icon

          return (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.12 + index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
            >
              <Icon className="h-4 w-4 text-blue-900" />
              <p className="mt-3 text-lg font-bold text-slate-900">{tile.value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{tile.label}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default AuthIllustration
