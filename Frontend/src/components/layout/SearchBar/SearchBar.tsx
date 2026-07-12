import { Search } from 'lucide-react'

const SearchBar = () => {
  return (
    <label className="hidden w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-400 transition-all duration-300 focus-within:border-blue-300 focus-within:bg-white sm:flex">
      <Search className="h-4 w-4 text-slate-400" />
      <input
        type="search"
        placeholder="Search assets, employees, bookings..."
        aria-label="Search anything"
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      <span className="rounded-2xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-400 shadow-sm">
        Ctrl + K
      </span>
    </label>
  )
}

export default SearchBar
