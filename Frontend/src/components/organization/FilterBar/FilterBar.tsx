import type { FC } from 'react'

const FilterBar: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

export default FilterBar
