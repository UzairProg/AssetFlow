import type { FC } from 'react'

const PermissionTable: FC = () => {
  const modules = ['Assets', 'Booking', 'Maintenance', 'Audit']
  const actions = ['Create', 'Read', 'Update', 'Delete', 'Approve', 'Export']

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-sm text-[#64748B]">
            <th className="px-3 py-2">Module</th>
            {actions.map((a) => <th key={a} className="px-3 py-2">{a}</th>)}
          </tr>
        </thead>
        <tbody>
          {modules.map((m) => (
            <tr key={m} className="border-t border-[#E5E7EB] hover:bg-slate-50">
              <td className="px-3 py-3 text-sm text-[#0F172A]">{m}</td>
              {actions.map((a) => (
                <td key={a} className="px-3 py-3 text-sm text-[#64748B]"><input type="checkbox" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PermissionTable
