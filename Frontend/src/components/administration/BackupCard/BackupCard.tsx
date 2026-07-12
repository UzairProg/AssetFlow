import type { FC } from 'react'

const BackupCard: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Backup & Recovery</h4>
      <div className="text-sm text-[#64748B]">Last backup: 2026-07-10 02:00</div>
      <div className="mt-3">
        <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Run Backup</button>
      </div>
    </div>
  )
}

export default BackupCard
