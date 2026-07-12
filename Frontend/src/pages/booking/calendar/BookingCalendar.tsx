import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import BookingCalendarView from '../../../components/booking/BookingCalendar/BookingCalendarView'

const BookingCalendar: FC = () => {
  return (
    <DashboardLayout title="Booking Calendar" subtitle="Monthly, weekly and daily booking views.">
      <div className="space-y-6">
        <BookingCalendarView />
      </div>
    </DashboardLayout>
  )
}

export default BookingCalendar
