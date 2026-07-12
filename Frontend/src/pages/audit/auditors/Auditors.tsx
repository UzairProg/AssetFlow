import type { FC } from 'react'
import AuditorCard from '../../../components/audit/AuditorCard/AuditorCard'

const Auditors: FC = () => {
  const auditors = [
    { id: 'a1', name: 'Emma Clarke', dept: 'IT', assigned: 3, available: true },
    { id: 'a2', name: 'Liam Johnson', dept: 'Facilities', assigned: 1, available: false },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#0F172A]">Auditors</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {auditors.map((t) => (
          <AuditorCard key={t.id} name={t.name} department={t.dept} assigned={t.assigned} available={t.available} />
        ))}
      </div>
    </div>
  )
}

export default Auditors
