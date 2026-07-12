import { motion } from 'framer-motion'
import { FiActivity, FiBarChart2, FiCalendar, FiPieChart, FiUsers } from 'react-icons/fi'

import { fadeUpVariants, SectionHeading, SectionShell } from '../shared'

const DashboardPreview = () => {
  return (
    <SectionShell id="modules" className="bg-slate-50">
      <div className="space-y-14">
        <SectionHeading
          eyebrow="Dashboard Preview"
          title="A realistic ERP workspace that feels calm, fast, and dependable."
          description="The interface is arranged like an actual enterprise system, with KPI cards, charts, operational lists, and live status summaries surrounding the main workspace."
        />

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <div className="absolute -left-2 top-10 hidden w-48 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <FiUsers />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Users</p>
                <p className="text-lg font-bold text-slate-900">1,284 active</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-16 hidden w-48 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <FiActivity />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Maintenance</p>
                <p className="text-lg font-bold text-slate-900">12 open</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-10 hidden w-44 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '1.1s' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Bookings</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">84</p>
            <p className="text-sm text-slate-500">Today</p>
          </div>

          <div className="absolute -bottom-6 right-12 hidden w-44 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block landing-float" style={{ animationDelay: '0.4s' }}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Analytics</p>
            <div className="mt-3 flex items-center gap-2 text-slate-900">
              <FiPieChart />
              <p className="text-sm font-semibold">98% visible</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">AssetFlow Console</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Enterprise Operations Overview</p>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm">
                  Q3 / Global
                </div>
              </div>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[1.3fr_0.9fr] lg:p-8">
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Assets', value: '10,248', change: '+8.4%', icon: FiBarChart2 },
                    { label: 'Approvals', value: '186', change: '+12.2%', icon: FiCalendar },
                    { label: 'Bookings', value: '84', change: '+5.1%', icon: FiCalendar },
                    { label: 'Uptime', value: '99.9%', change: 'Stable', icon: FiActivity },
                  ].map((item) => {
                    const Icon = item.icon

                    return (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{item.value}</p>
                          </div>
                          <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-sm">
                            <Icon />
                          </div>
                        </div>
                        <p className="mt-4 text-sm font-medium text-slate-500">{item.change}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-900">Utilization trend</h3>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Last 30 days</span>
                    </div>
                    <div className="mt-6 flex h-44 items-end gap-3">
                      {[44, 58, 35, 72, 64, 84, 96, 76, 88, 62].map((height, index) => (
                        <div key={height} className="flex flex-1 flex-col items-center gap-2">
                          <div className="w-full rounded-t-2xl bg-slate-100">
                            <div
                              className="rounded-t-2xl bg-slate-900"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                            W{index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-900">Activity feed</h3>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live</span>
                    </div>
                    <div className="mt-4 space-y-4">
                      {[
                        'Maintenance request approved for Conference Hall A',
                        'Asset transfer submitted for Laptop Set - Marketing',
                        'Vehicle booking confirmed for Operations team',
                      ].map((entry) => (
                        <div key={entry} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                          <p className="text-sm leading-6 text-slate-600">{entry}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Inventory mix</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900">Healthy balance</p>
                    </div>
                    <FiPieChart className="text-2xl text-slate-900" />
                  </div>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-slate-900 border-r-slate-200 border-b-slate-200 bg-white text-sm font-semibold text-slate-900">
                      68%
                    </div>
                    <div className="space-y-3 text-sm text-slate-600">
                      <p>Assigned assets</p>
                      <p>Available assets</p>
                      <p>Maintenance holds</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">Operational snapshot</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: 'Approvals', width: '82%' },
                      { label: 'Maintenance', width: '64%' },
                      { label: 'Allocations', width: '91%' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-600">{item.label}</span>
                          <span className="font-semibold text-slate-900">{item.width}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-slate-900" style={{ width: item.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">Recent approvals</h3>
                  <div className="mt-4 space-y-3">
                      {['Asset request', 'Booking change', 'Maintenance escalation'].map((label) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="text-sm font-medium text-slate-700">{label}</span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                          Approved
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default DashboardPreview