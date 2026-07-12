import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'

const BookingDetails: FC = () => {
  return (
    <DashboardLayout title="Booking Details" subtitle="Detailed view of the booking and history.">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#0F172A]">Projector • Booking #BK-1023</h3>
          <div className="mt-2 text-sm text-[#64748B]">Booked by: John Doe • 2024-07-12 10:00 - 11:00</div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BookingDetails
