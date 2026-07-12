import type { FC } from 'react'

type Props = { title?: string; subtitle?: string }

const EmptyState: FC<Props> = ({ title = 'No results', subtitle = 'Try adjusting your filters or search terms.' }) => {
  return (
    <div className="rounded-2xl border border-dashed border-[#E5E7EB] bg-white p-8 text-center text-sm text-[#64748B]">
      <div className="text-lg font-semibold text-[#0F172A]">{title}</div>
      <div className="mt-2">{subtitle}</div>
    </div>
  )
}

export default EmptyState
