import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'

const BookingHistory: FC = () => {
  return (
    <DashboardLayout title="Booking History" subtitle="Timeline of past and upcoming bookings.">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">Booking history timeline placeholder</div>
      </div>
    </DashboardLayout>
  )
}

export default BookingHistory
