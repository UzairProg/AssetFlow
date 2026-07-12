import type { FC } from 'react'
import { useState } from 'react'

const sample = [
  { id: 'b1', title: 'Weekly Standup • Conf A', time: '09:00 - 09:30', user: 'Team' },
  { id: 'b2', title: 'Project Sync • Conf B', time: '11:00 - 12:00', user: 'Product' },
]

const BookingTable: FC = () => {
  const [rows] = useState(sample)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-[#0F172A]">Upcoming Bookings</h4>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-[#0F172A]">{r.title}</div>
              <div className="text-xs text-[#64748B]">{r.time} • {r.user}</div>
            </div>
            <div className="text-sm text-[#1E3A8A]">View</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingTable
