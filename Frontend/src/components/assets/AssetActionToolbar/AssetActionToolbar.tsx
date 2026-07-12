import type { FC } from 'react'

type Props = { onOpenFilters?: () => void }

const AssetActionToolbar: FC<Props> = ({ onOpenFilters }) => {
  return (
    <div className="flex items-center gap-3">
      <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Import</button>
      <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Export</button>
      <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Register Asset</button>
      <button type="button" onClick={onOpenFilters} className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Filters</button>
    </div>
  )
}

export default AssetActionToolbar
