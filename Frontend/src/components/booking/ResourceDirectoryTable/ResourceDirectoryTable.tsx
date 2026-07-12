import type { FC } from 'react'
import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, ColumnDef } from '@tanstack/react-table'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Resource = {
  id: string
  name: string
  type: string
  capacity: number
  location: string
  status: string
}

const sample: Resource[] = [
  { id: 'r1', name: 'Conference Room A', type: 'Room', capacity: 12, location: 'Floor 3', status: 'Available' },
  { id: 'r2', name: 'Projector X1', type: 'Projector', capacity: 0, location: 'Store', status: 'Booked' },
  { id: 'r3', name: 'Company Van 3', type: 'Vehicle', capacity: 6, location: 'Garage', status: 'Available' },
]

const columnHelper = createColumnHelper<Resource>()

const columns: ColumnDef<Resource, unknown>[] = [
  columnHelper.accessor('name', { header: 'Resource' }),
  columnHelper.accessor('type', { header: 'Type' }),
  columnHelper.accessor('capacity', { header: 'Capacity' }),
  columnHelper.accessor('location', { header: 'Location' }),
  columnHelper.accessor('status', { header: 'Status', cell: (info) => <StatusBadge status={(info.getValue() as string).toLowerCase()} /> }),
]

const ResourceDirectoryTable: FC = () => {
  const [data] = useState<Resource[]>(sample)

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
                    <button type="button" className="text-sm text-[#1E3A8A]">Book</button>
                    <button type="button" className="text-sm text-[#64748B]">Details</button>
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

export default ResourceDirectoryTable
