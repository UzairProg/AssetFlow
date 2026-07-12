import type { FC } from 'react'
import { Bell, CheckCircle, Clock } from 'lucide-react'

const notifications = [
  { id: 1, title: 'Asset Returned', desc: 'Laptop AF-023 returned by John', time: '2m', unread: true },
  { id: 2, title: 'Booking Confirmed', desc: 'Meeting Room A booked by HR', time: '22m', unread: true },
  { id: 3, title: 'Maintenance Completed', desc: 'Scanner repaired', time: '1h', unread: false },
  { id: 4, title: 'Audit Started', desc: 'Quarterly audit started', time: '3h', unread: false },
]

const NotificationList: FC = () => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-slate-50 p-2 text-slate-700">
            <Bell className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-semibold text-[#0F172A]">Recent Notifications</h4>
        </div>
        <button className="text-xs font-semibold text-[#1E3A8A]">View all</button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-slate-50">
            <div className={`mt-1 h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl ${n.unread ? 'bg-blue-900 text-white' : 'bg-slate-50 text-slate-600'}`}> 
              {n.unread ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0F172A]">{n.title}</p>
              <p className="text-xs text-[#64748B] truncate">{n.desc}</p>
            </div>
            <div className="text-xs text-[#64748B]">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationList
