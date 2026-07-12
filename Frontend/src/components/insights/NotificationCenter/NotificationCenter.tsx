import type { FC } from 'react'
import NotificationCard from '../NotificationCard/NotificationCard'

const NotificationCenter: FC = () => {
  const notes = [
    { id: 'N1', title: 'Asset Assigned', body: 'Laptop assigned to Alice', level: 'info', time: '2h' },
    { id: 'N2', title: 'Maintenance Approved', body: 'Request #M-123 approved', level: 'success', time: '1d' },
    { id: 'N3', title: 'Booking Confirmed', body: 'Projector booking confirmed', level: 'info', time: '3d' },
  ]

  return (
    <div className="space-y-3">
      {notes.map((n) => <NotificationCard key={n.id} title={n.title} body={n.body} level={n.level} time={n.time} />)}
    </div>
  )
}

export default NotificationCenter
