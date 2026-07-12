import type { FC } from 'react'
import { useMemo, useState } from 'react'

type AuditCycle = {
  id: string
  name: string
  department: string
  location: string
  start: string
  end: string
  auditors: string
  progress: number
  status: string
}

const sample: AuditCycle[] = [
  { id: 'A-1001', name: 'Quarterly Data Center', department: 'IT', location: 'DC-1', start: '2026-07-01', end: '2026-07-07', auditors: 'Emma, Liam', progress: 45, status: 'In Progress' },
  { id: 'A-1002', name: 'Office Equipment Audit', department: 'Facilities', location: 'HQ', start: '2026-06-01', end: '2026-06-30', auditors: 'Oliver', progress: 100, status: 'Completed' },
]

const AuditCycleTable: FC = () => {
  const [data] = useState(sample)
  const [sortKey] = useState<string | null>('')
  const [page, setPage] = useState(1)
  const perPage = 10

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => String(a[sortKey as keyof AuditCycle]).localeCompare(String(b[sortKey as keyof AuditCycle])))
  }, [data, sortKey])

  const pageData = useMemo(() => sorted.slice((page - 1) * perPage, page * perPage), [sorted, page])

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Showing {data.length} audit cycles</div>
        <div className="flex items-center gap-2">
          <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Export</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white">
            <tr className="text-left text-sm text-[#64748B]">
              <th className="whitespace-nowrap px-3 py-2">Audit ID</th>
              <th className="px-3 py-2">Audit Name</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Start</th>
              <th className="px-3 py-2">End</th>
              <th className="px-3 py-2">Auditors</th>
              <th className="px-3 py-2">Progress</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((r) => (
              <tr key={r.id} className="border-t border-[#E5E7EB] hover:bg-slate-50">
                <td className="px-3 py-3 text-sm font-semibold text-[#0F172A]">{r.id}</td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.name}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.department}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.location}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.start}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.end}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]">{r.auditors}</td>
                <td className="px-3 py-3 text-sm text-[#64748B]"><div className="w-36 overflow-hidden rounded-full bg-[#E5E7EB]"><div style={{ width: `${r.progress}%` }} className="h-2 rounded-full bg-[#1E3A8A]" /></div></td>
                <td className="px-3 py-3 text-sm text-[#0F172A]">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-[#64748B]">Page {page}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Previous</button>
          <button onClick={() => setPage((p) => p + 1)} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Next</button>
        </div>
      </div>
    </div>
  )
}

export default AuditCycleTable
