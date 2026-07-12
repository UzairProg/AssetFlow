import type { FC } from 'react'

const BookingHeatmap: FC = () => {
  const days = Array.from({ length: 14 }).map((_, i) => ({ day: `D${i + 1}`, value: Math.floor(Math.random() * 5) }))

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-[#0F172A]">Booking Heatmap</h4>
        <div className="text-xs text-[#64748B]">Meeting Room Usage</div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className={`h-8 w-8 rounded-lg ${d.value > 3 ? 'bg-blue-900' : d.value > 1 ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
            <div className="text-[10px] text-[#64748B]">{d.day}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingHeatmap
