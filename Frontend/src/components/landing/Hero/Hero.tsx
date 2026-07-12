import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiCheckCircle,
  FiBell,
  FiCalendar,
  FiCpu,
  FiTrendingUp,
} from 'react-icons/fi'

import { goToPath } from '../../../lib/demoAuth'
import { fadeUpVariants, staggerVariants } from '../shared'

const heroHighlights = ['Enterprise Ready', 'Secure', 'Fast Deployment']

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-white pb-20 pt-14 sm:pb-24 lg:pb-28 lg:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl space-y-8"
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-900" />
            Enterprise Asset & Resource Management
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            <span className="text-blue-900">Manage Assets.</span>
            <span className="block">Empower Teams.</span>
            <span className="block">Drive Efficiency.</span>
          </motion.h1>

          <motion.p variants={fadeUpVariants} className="max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
            AssetFlow brings departments, employees, assets, bookings, maintenance,
            audits, and analytics into one disciplined enterprise system built for speed,
            clarity, and control.
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => goToPath('/signup')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-900 px-7 py-4 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl"
            >
              Get Started
              <FiArrowRight />
            </button>
            <a
              href="#workflow"
              className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-4 text-sm font-semibold text-blue-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
            >
              Book Demo
            </a>
          </motion.div>

          <motion.ul variants={fadeUpVariants} className="grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <FiCheckCircle className="text-blue-900" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="absolute -left-6 top-12 hidden w-40 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <FiTrendingUp />
              96% utilization
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[96%] rounded-full bg-blue-900" />
            </div>
          </div>

          <div className="absolute -right-8 top-10 hidden w-44 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '0.9s' }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <FiBell />
              18 alerts
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Approvals and maintenance updates are moving now.</p>
          </div>

          <div className="absolute -bottom-8 left-10 hidden w-44 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '1.4s' }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <FiCalendar />
              42 bookings
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Shared resources remain visible and controlled.</p>
          </div>

          <div className="absolute -bottom-4 right-8 hidden w-44 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-900">
              <FiCpu />
              Automated flows
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Policy-driven routing keeps work moving.</p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="h-3 w-3 rounded-full bg-slate-300" />
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">Live allocation</p>
                  <div className="mt-4 flex items-end gap-3">
                    <div className="h-16 w-10 rounded-xl bg-blue-900/85" />
                    <div className="h-24 w-10 rounded-xl bg-blue-900/65" />
                    <div className="h-12 w-10 rounded-xl bg-blue-900/45" />
                    <div className="h-28 w-10 rounded-xl bg-blue-900" />
                    <div className="h-20 w-10 rounded-xl bg-blue-900/55" />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">Pending approvals</p>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">24</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[72%] rounded-full bg-blue-900" />
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[48%] rounded-full bg-blue-900" />
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[88%] rounded-full bg-blue-900" />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">Assets</p>
                      <p className="mt-4 text-3xl font-bold text-blue-900">10.2K</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">Uptime</p>
                      <p className="mt-4 text-3xl font-bold text-blue-900">99.9%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Book rooms</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Managed reservations with policy approval.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Maintenance</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Track asset issues from request to completion.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Audit</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Verify asset records and flag discrepancies fast.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero