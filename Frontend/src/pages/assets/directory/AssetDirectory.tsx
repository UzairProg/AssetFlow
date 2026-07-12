import type { FC } from 'react'
import { useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import SearchBar from '../../../components/assets/SearchBar/SearchBar'
import AssetActionToolbar from '../../../components/assets/AssetActionToolbar/AssetActionToolbar'
import AssetDirectoryTable from '../../../components/assets/AssetDirectoryTable/AssetDirectoryTable'
import AdvancedFilterDrawer from '../../../components/assets/AdvancedFilter/AdvancedFilterDrawer'

const AssetDirectory: FC = () => {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <DashboardLayout title="Asset Directory" subtitle="Browse and manage all assets with powerful search and filters.">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <SearchBar placeholder="Search assets, tags, departments, employees..." />
          </div>
          <div className="mt-2 flex-shrink-0">
            <AssetActionToolbar onOpenFilters={() => setFilterOpen(true)} />
          </div>
        </div>

        <AssetDirectoryTable />

        <AdvancedFilterDrawer open={filterOpen} onClose={() => setFilterOpen(false)} />
      </div>
    </DashboardLayout>
  )
}

export default AssetDirectory
