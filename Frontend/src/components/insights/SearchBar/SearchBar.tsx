import type { FC } from 'react'

const SearchBar: FC = () => {
  return (
    <div>
      <input placeholder="Search" className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm" />
    </div>
  )
}

export default SearchBar
