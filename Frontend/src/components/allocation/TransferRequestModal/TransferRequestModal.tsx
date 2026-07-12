import type { FC } from 'react'
import { useState } from 'react'
import Modal from '../../common/Modal/Modal'

type Props = { open: boolean; onClose: () => void }

const TransferRequestModal: FC<Props> = ({ open, onClose }) => {
  const [notes, setNotes] = useState('')

  return (
    <Modal open={open} onClose={onClose} title="Create Transfer Request">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-[#64748B]">Requested To</label>
          <select className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
            <option>Alice Smith — Sales</option>
            <option>Bob Lee — Field</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-[#64748B]">Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" rows={4} />
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onClose} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm font-semibold text-[#1E3A8A]">Cancel</button>
          <button type="button" className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm font-semibold text-white">Submit Request</button>
        </div>
      </div>
    </Modal>
  )
}

export default TransferRequestModal
