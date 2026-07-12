import type { FC } from 'react'
import NotificationCenter from '../../../components/insights/NotificationCenter/NotificationCenter'

const NotificationsCenter: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">Notifications</h2>
      <NotificationCenter />
    </div>
  )
}

export default NotificationsCenter
