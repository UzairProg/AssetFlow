import type { FC } from 'react'
import AuditCycleTable from '../../../components/audit/AuditCycleTable/AuditCycleTable'
import SearchBar from '../../../components/audit/SearchBar/SearchBar'
import FilterDrawer from '../../../components/audit/FilterDrawer/FilterDrawer'
import { useState } from 'react'

const AuditCycles: FC = () => {
  const [openFilters, setOpenFilters] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#0F172A]">Audit Cycles</h2>
        <div className="flex items-center gap-3">
          <SearchBar />
          <button onClick={() => setOpenFilters(true)} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Filters</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <AuditCycleTable />
      </div>

      <FilterDrawer open={openFilters} onClose={() => setOpenFilters(false)} />
    </div>
  )
}

export default AuditCycles
