import type { FC } from 'react'
import { Search } from 'lucide-react'

const SearchBar: FC<{ placeholder?: string; value?: string; onChange?: (v: string) => void }> = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <label className="flex w-full items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#64748B]">
      <Search className="h-4 w-4 text-[#64748B]" />
      <input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} className="w-full bg-transparent outline-none" />
    </label>
  )
}

export default SearchBar
