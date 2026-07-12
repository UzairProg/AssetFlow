import type { FC } from 'react'

type Props = { label: string; value: number | string; color?: 'info' | 'success' | 'warning' | 'danger' }

const AuditStatisticsCard: FC<Props> = ({ label, value, color = 'info' }) => {
  const colorMap: Record<string, string> = {
    info: 'text-[#2563EB]',
    success: 'text-[#16A34A]',
    warning: 'text-[#F59E0B]',
    danger: 'text-[#DC2626]',
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-[#64748B]">{label}</div>
      <div className={`mt-2 text-2xl font-semibold text-[#0F172A] ${colorMap[color]}`}>{value}</div>
    </div>
  )
}

export default AuditStatisticsCard
