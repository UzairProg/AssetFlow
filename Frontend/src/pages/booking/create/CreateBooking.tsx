import type { FC } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout'
import BookingWizard from '../../../components/booking/BookingWizard/BookingWizard'

const CreateBooking: FC = () => {
  return (
    <DashboardLayout title="Create Booking" subtitle="Reserve a room or resource quickly.">
      <div className="space-y-6">
        <BookingWizard />
      </div>
    </DashboardLayout>
  )
}

export default CreateBooking
