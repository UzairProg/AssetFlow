import type { FC } from 'react'

const EmployeeSelector: FC = () => {
  return (
    <select className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
      <option value="">Select employee...</option>
      <option>John Doe — Engineering</option>
      <option>Alice Smith — Sales</option>
      <option>Bob Lee — Field</option>
    </select>
  )
}

export default EmployeeSelector
