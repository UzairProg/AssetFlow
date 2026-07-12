import type { FC } from 'react'

const AssetSelector: FC = () => {
  return (
    <select className="mt-1 w-full rounded-2xl border border-[#E5E7EB] px-3 py-2">
      <option value="">Select asset...</option>
      <option>AST-0001 • Dell Latitude 7420</option>
      <option>AST-0003 • iPhone 13 Pro</option>
      <option>AST-0009 • Surface Pro</option>
    </select>
  )
}

export default AssetSelector
