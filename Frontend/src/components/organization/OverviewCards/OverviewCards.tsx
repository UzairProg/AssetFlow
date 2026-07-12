import type { FC } from 'react'
import StatisticsCard from '../StatisticsCard/StatisticsCard'
import { Users, Building2, Box } from 'lucide-react'

const OverviewCards: FC = () => {
  const items = [
    { title: 'Departments', value: 24, delta: '+2.4%', icon: <Building2 className="h-5 w-5 text-[#1E3A8A]" /> },
    { title: 'Employees', value: 156, delta: '+1.2%', icon: <Users className="h-5 w-5 text-[#1E3A8A]" /> },
    { title: 'Asset Categories', value: 18, delta: '+0.8%', icon: <Box className="h-5 w-5 text-[#1E3A8A]" /> },
    { title: 'Active Departments', value: 21, delta: '+1', icon: <Building2 className="h-5 w-5 text-[#1E3A8A]" /> },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <StatisticsCard key={it.title} title={it.title} value={it.value} delta={it.delta} icon={it.icon} />
      ))}
    </div>
  )
}

export default OverviewCards
