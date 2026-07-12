import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import ResourceDirectoryTable from '../../../components/booking/ResourceDirectoryTable/ResourceDirectoryTable'
import ResourceCard from '../../../components/booking/ResourceCard/ResourceCard'

const ResourceDirectory: FC = () => {
  return (
    <DashboardLayout title="Resource Directory" subtitle="Browse meeting rooms, equipment and vehicles.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <ResourceDirectoryTable />
          </div>
          <aside className="space-y-4">
            <ResourceCard />
            <ResourceCard />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ResourceDirectory
