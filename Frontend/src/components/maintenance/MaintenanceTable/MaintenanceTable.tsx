import type { FC } from 'react'
import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, ColumnDef } from '@tanstack/react-table'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Request = {
  id: string
  asset: string
  reportedBy: string
  department: string
  priority: string
  status: string
  technician?: string
  created: string
}

const sample: Request[] = [
  { id: 'mr-1', asset: 'AC Unit #3', reportedBy: 'Alice Smith', department: 'Facilities', priority: 'High', status: 'Pending', technician: '', created: '2024-07-01' },
  { id: 'mr-2', asset: 'Conveyor Belt', reportedBy: 'Plant Ops', department: 'Manufacturing', priority: 'Critical', status: 'In Progress', technician: 'Bob Tech', created: '2024-06-28' },
]

const columnHelper = createColumnHelper<Request>()

const columns: ColumnDef<Request, unknown>[] = [
  columnHelper.accessor('id', { header: 'Request ID' }),
  columnHelper.accessor('asset', { header: 'Asset' }),
  columnHelper.accessor('reportedBy', { header: 'Reported By' }),
  columnHelper.accessor('department', { header: 'Department' }),
  columnHelper.accessor('priority', { header: 'Priority' }),
  columnHelper.accessor('status', { header: 'Status', cell: (info) => <StatusBadge status={(info.getValue() as string).toLowerCase()} /> }),
  columnHelper.accessor('technician', { header: 'Assigned Technician', cell: (info) => info.getValue() || '—' }),
  columnHelper.accessor('created', { header: 'Created Date' }),
]

const MaintenanceTable: FC = () => {
  const [data] = useState<Request[]>(sample)
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="text-left text-xs text-[#64748B]">
                {hg.headers.map((h) => (
                  <th key={h.id} className="py-2">{h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}</th>
                ))}
                <th className="py-2">Actions</th>
              </tr>
            ))}
          </thead>
          <tbody className="mt-3 divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3">{flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.header, cell.getContext())}</td>
                ))}
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-sm text-[#1E3A8A]">View</button>
                    <button type="button" className="text-sm text-[#64748B]">Assign</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MaintenanceTable
