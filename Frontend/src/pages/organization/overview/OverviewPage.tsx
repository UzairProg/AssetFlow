import type { FC } from 'react'
import { motion } from 'framer-motion'

import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import OverviewCards from '../../../components/organization/OverviewCards/OverviewCards'
import DepartmentTable from '../../../components/organization/DepartmentTable/DepartmentTable'
import SearchBar from '../../../components/organization/SearchBar/SearchBar'

const OverviewPage: FC = () => {
  return (
    <DashboardLayout title="Organization Overview" subtitle="Manage your organization's structure, teams and master data." actions={<div className="flex items-center gap-3"><button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Quick Add</button></div>}>
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="space-y-6">
        <OverviewCards />

        <div className="flex items-center justify-between gap-4">
          <SearchBar placeholder="Search departments, employees..." />
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
            <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Refresh</button>
          </div>
        </div>

        <DepartmentTable />
      </motion.div>
    </DashboardLayout>
  )
}

export default OverviewPage
