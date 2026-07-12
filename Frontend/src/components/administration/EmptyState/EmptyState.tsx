import type { FC } from 'react'

const EmptyState: FC<{ message?: string }> = ({ message = 'Nothing to show' }) => {
  return <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center text-sm text-[#64748B] shadow-sm">{message}</div>
}

export default EmptyState
