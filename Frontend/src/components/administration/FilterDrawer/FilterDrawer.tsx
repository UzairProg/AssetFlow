import type { FC } from 'react'

type Props = { open: boolean; onClose: () => void }

const FilterDrawer: FC<Props> = ({ open, onClose }) => {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white p-6 shadow-lg transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#0F172A]">Filters</h3>
          <button type="button" onClick={onClose} className="text-sm text-[#64748B]">Close</button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-xs text-[#64748B]">Department</label>
            <select className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <option>All</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-[#64748B]">Status</label>
            <select className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
              <option>Any</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button type="button" className="mt-2 rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Reset</button>
            <button type="button" className="mt-2 rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Apply</button>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default FilterDrawer
