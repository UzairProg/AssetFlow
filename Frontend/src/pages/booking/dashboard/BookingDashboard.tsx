import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import BookingStatisticsCard from '../../../components/booking/Statistics/BookingStatisticsCard'
import BookingCalendarView from '../../../components/booking/BookingCalendar/BookingCalendarView'
import BookingTable from '../../../components/booking/BookingTable/BookingTable'

const stats = [
  { label: 'Total Bookings', value: 124 },
  { label: "Today's Bookings", value: 18 },
  { label: 'Upcoming', value: 42 },
  { label: 'Cancelled', value: 3 },
  { label: 'Resources In Use', value: 26 },
]

const BookingDashboard: FC = () => {
  return (
    <DashboardLayout title="Booking Dashboard" subtitle="Manage workspace resources and reservations.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s) => (
            <BookingStatisticsCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingCalendarView />
          </div>
          <div className="space-y-6">
            <BookingTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default BookingDashboard
