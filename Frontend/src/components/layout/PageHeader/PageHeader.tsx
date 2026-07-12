import type { ReactNode } from 'react'

import { motion } from 'framer-motion'

import Breadcrumb from '../Breadcrumb/Breadcrumb'

type PageHeaderProps = {
  title: string
  subtitle: string
  actions?: ReactNode
}

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6"
    >
      <Breadcrumb />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">{subtitle}</p>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </motion.div>
  )
}

export default PageHeader
