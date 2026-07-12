import type { FC } from 'react'

const RoleMatrix: FC = () => {
  const rows = ['Assets', 'Booking', 'Maintenance', 'Audit']
  const roles = ['Administrator', 'Asset Manager', 'Employee']

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="sticky top-0 bg-white">
          <tr className="text-left text-sm text-[#64748B]">
            <th className="px-3 py-2">Module</th>
            {roles.map((r) => <th key={r} className="px-3 py-2">{r}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row} className="border-t border-[#E5E7EB] hover:bg-slate-50">
              <td className="px-3 py-3 text-sm text-[#0F172A]">{row}</td>
              {roles.map((r) => (
                <td key={r} className="px-3 py-3 text-sm text-[#64748B]"><input type="checkbox" /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoleMatrix
