import React from 'react'
import { motion } from 'framer-motion'
import { FilePlus, GitMerge, Calendar, Wrench, Layers, Box } from 'lucide-react'

import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import KPICard from './components/KPICard'
import DonutChart from './components/DonutChart'
import DeptBarChart from './components/DeptBarChart'
import QuickActionCard from './components/QuickActionCard'
import StatusCard from './components/StatusCard'
import NotificationList from './components/NotificationList'
import EmployeeTable from './components/EmployeeTable'
import BookingHeatmap from './components/BookingHeatmap'
import Timeline from './components/Timeline'

const kpis = [
  { title: 'Total Assets', value: '1,248', trend: '+8.2%', trendPositive: true, progress: 78 },
  { title: 'Available Assets', value: '642', trend: '+4%', trendPositive: true, progress: 52 },
  { title: 'Allocated Assets', value: '486', trend: '+6%', trendPositive: true, progress: 39 },
  { title: 'Under Maintenance', value: '18', trend: '-2%', trendPositive: false, progress: 2 },
  { title: 'Active Bookings', value: '32', trend: '+11%', trendPositive: true, progress: 14 },
  { title: 'Upcoming Returns', value: '26', trend: 'Today', trendPositive: true, progress: 28 },
  { title: 'Audit Cycles', value: '3', trend: 'Active', trendPositive: true, progress: 20 },
  { title: 'Employees', value: '156', trend: '+12', trendPositive: true, progress: 65 },
]

const donutData = [
  { name: 'Available', value: 642 },
  { name: 'Allocated', value: 486 },
  { name: 'Maintenance', value: 18 },
  { name: 'Lost', value: 12 },
  { name: 'Retired', value: 90 },
]

const deptData = [
  { name: 'IT', assets: 420 },
  { name: 'HR', assets: 80 },
  { name: 'Finance', assets: 110 },
  { name: 'Operations', assets: 360 },
  { name: 'Marketing', assets: 80 },
]

const recentActivities = [
  { title: 'Laptop AF-023 allocated', meta: 'Assigned to John Doe', time: '2m' },
  { title: 'Maintenance approved', meta: 'Scanner #12', time: '22m' },
  { title: 'Meeting Room booked', meta: 'Room A by HR', time: '1h' },
  { title: 'Audit completed', meta: 'Audit Q2', time: '3h' },
  { title: 'Transfer approved', meta: 'Asset AF-199', time: '5h' },
]

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back, Admin. Here's what's happening across your organization today."
      actions={(
        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#0F172A]">Mon, 12 Jul 2026</div>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
          <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Refresh</button>
        </div>
      )}
    >
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }} className="space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <KPICard key={k.title} title={k.title} value={k.value} trend={k.trend} trendPositive={k.trendPositive} progress={k.progress} icon={<div className="rounded-full bg-slate-50 p-2 text-[#1E3A8A]">{k.title.charAt(0)}</div>} />
          ))}
        </div>

        {/* Main Analytics */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Asset Allocation Overview</h3>
              <div className="text-sm text-[#64748B]">Allocation by status</div>
            </div>
            <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 lg:max-w-[56%]">
                <DonutChart data={donutData} />
              </div>
              <div className="lg:w-[36%]">
                <h4 className="text-sm font-semibold text-[#0F172A]">Recent Activities</h4>
                <div className="mt-4 space-y-3">
                  {recentActivities.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl p-3 hover:bg-slate-50">
                      <div className="h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-[#1E3A8A]">{i + 1}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-[#0F172A]">{a.title}</div>
                        <div className="text-xs text-[#64748B]">{a.meta}</div>
                      </div>
                      <div className="ml-3 text-xs text-[#64748B]">{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#0F172A]">System Status</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatusCard title="Database" status="Healthy" details="No incidents" />
              <StatusCard title="API" status="Healthy" details="All endpoints responsive" />
              <StatusCard title="Storage" status="Healthy" details="Usage 62%" />
              <StatusCard title="Backups" status="Healthy" details="Last: 2h ago" />
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-[#0F172A]">Upcoming Returns</h4>
            <div className="mt-4 space-y-3">
              <Timeline items={[{ title: 'Laptop AF-023', meta: 'John Doe — Due Today', time: 'Today' }, { title: 'Projector PR-11', meta: 'Ops — Due Tomorrow', time: 'Tomorrow' }]} />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-[#0F172A]">Pending Maintenance</h4>
            <div className="mt-4 space-y-3">
              <Timeline items={[{ title: 'Scanner SC-02', meta: 'Pending approval', time: '2d' }, { title: 'Printer PR-09', meta: 'Parts ordered', time: '1w' }]} />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-[#0F172A]">Pending Approvals</h4>
            <div className="mt-4 space-y-3">
              <Timeline items={[{ title: 'Transfer AF-199', meta: 'Approver: Jane', time: '3h' }, { title: 'Allocation AF-176', meta: 'Approver: Mark', time: '5h' }]} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-[#0F172A]">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <QuickActionCard title="Register Asset" icon={<FilePlus className="h-5 w-5" />} />
            <QuickActionCard title="Allocate Asset" icon={<GitMerge className="h-5 w-5" />} />
            <QuickActionCard title="Book Resource" icon={<Calendar className="h-5 w-5" />} />
            <QuickActionCard title="Raise Maintenance" icon={<Wrench className="h-5 w-5" />} />
            <QuickActionCard title="Create Audit" icon={<Layers className="h-5 w-5" />} />
            <QuickActionCard title="View Reports" icon={<Box className="h-5 w-5" />} />
          </div>
        </div>

        {/* Resource Utilization and Heatmap */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-[#0F172A]">Department Asset Distribution</h4>
            <div className="mt-4">
              <DeptBarChart data={deptData} />
            </div>
          </div>

          <BookingHeatmap />
        </div>

        {/* Notifications and Employees */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2">
            <NotificationList />
          </div>
          <EmployeeTable />
        </div>

        {/* Upcoming Audits */}
        <div>
          <h4 className="mb-4 text-sm font-semibold text-[#0F172A]">Upcoming Audits</h4>
          <Timeline items={[{ title: 'Quarterly Audit Q3', meta: 'Finance — Assigned: Mark', time: '2026-08-12' }, { title: 'Inventory Audit', meta: 'Ops — Assigned: Sara', time: '2026-09-01' }]} />
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default DashboardPage
