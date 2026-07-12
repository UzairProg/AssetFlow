import type { FC } from 'react'

type Props = { title: string; body: string; level?: string; time?: string }

const NotificationCard: FC<Props> = ({ title, body, level = 'info', time }) => {
  const color = level === 'success' ? 'text-[#16A34A]' : 'text-[#2563EB]'
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className={`text-sm font-semibold text-[#0F172A] ${color}`}>{title}</div>
          <div className="mt-1 text-sm text-[#64748B]">{body}</div>
        </div>
        <div className="text-xs text-[#64748B]">{time}</div>
      </div>
    </div>
  )
}

export default NotificationCard
