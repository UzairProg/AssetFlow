import type { FC } from 'react'

type Props = { placeholder?: string }

const SearchBar: FC<Props> = ({ placeholder = 'Search...' }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white px-3 py-2 shadow-sm">
      <input aria-label="Global search" placeholder={placeholder} className="w-full bg-transparent text-sm outline-none" />
    </div>
  )
}

export default SearchBar
