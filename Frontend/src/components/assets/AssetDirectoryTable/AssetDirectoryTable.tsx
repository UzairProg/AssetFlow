import type { FC } from 'react'
import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, ColumnDef } from '@tanstack/react-table'
import Avatar from '../../common/Avatar/Avatar'
import StatusBadge from '../../common/StatusBadge/StatusBadge'

type Asset = {
  id: string
  tag: string
  name: string
  category: string
  department: string
  assignedTo?: string
  status: string
  condition: string
  purchaseDate: string
}

const sample: Asset[] = [
  { id: 'a1', tag: 'AST-0001', name: 'Dell Latitude 7420', category: 'Laptop', department: 'Engineering', assignedTo: 'John Doe', status: 'Available', condition: 'Good', purchaseDate: '2022-01-12' },
  { id: 'a2', tag: 'AST-0002', name: 'HP LaserJet Pro', category: 'Printer', department: 'Finance', assignedTo: '', status: 'Allocated', condition: 'Fair', purchaseDate: '2020-06-30' },
  { id: 'a3', tag: 'AST-0003', name: 'iPhone 13 Pro', category: 'Mobile', department: 'Sales', assignedTo: 'Alice Smith', status: 'Reserved', condition: 'Good', purchaseDate: '2023-03-08' },
]

const columnHelper = createColumnHelper<Asset>()

const columns: ColumnDef<Asset, unknown>[] = [
  columnHelper.accessor('name', {
    header: 'Asset',
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Avatar name={info.getValue()} />
        <div>
          <div className="font-medium text-[#0F172A]">{info.getValue()}</div>
          <div className="text-xs text-[#64748B]">{info.row.original.tag}</div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('category', { header: 'Category' }),
  columnHelper.accessor('department', { header: 'Department' }),
  columnHelper.accessor('assignedTo', { header: 'Assigned To', cell: (info) => info.getValue() || '—' }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={(info.getValue() as string).toLowerCase()} />,
  }),
  columnHelper.accessor('condition', { header: 'Condition' }),
  columnHelper.accessor('purchaseDate', { header: 'Purchase Date' }),
]

const AssetDirectoryTable: FC = () => {
  const [data] = useState<Asset[]>(sample)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
                  <td key={cell.id} className="py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <button type="button" className="text-sm text-[#1E3A8A]">View</button>
                    <button type="button" className="text-sm text-[#64748B]">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-[#64748B]">{data.length} assets</div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-1 text-sm font-semibold text-[#1E3A8A]">Previous</button>
          <button type="button" className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-1 text-sm font-semibold text-[#1E3A8A]">Next</button>
        </div>
      </div>
    </div>
  )
}

export default AssetDirectoryTable
