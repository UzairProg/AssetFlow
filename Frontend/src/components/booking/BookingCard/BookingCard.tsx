import type { FC } from 'react'

type Props = { title?: string; time?: string; user?: string }

const BookingCard: FC<Props> = ({ title = 'Meeting Room Booking', time = '10:00 - 11:00', user = 'John Doe' }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm">
      <div className="font-medium text-[#0F172A]">{title}</div>
      <div className="text-xs text-[#64748B]">{time} • {user}</div>
    </div>
  )
}

export default BookingCard
