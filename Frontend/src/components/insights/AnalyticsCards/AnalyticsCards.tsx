import type { FC } from 'react'

const AnalyticsCards: FC = () => {
  const items = [
    { label: 'Utilization', value: '68%' },
    { label: 'Booking Trend', value: '↑ 5%' },
    { label: 'Audit Completion', value: '82%' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.label} className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm text-[#64748B]">{i.label}</div>
          <div className="mt-2 text-2xl font-semibold text-[#0F172A]">{i.value}</div>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsCards
