import type { FC } from 'react'

const LoadingSkeleton: FC = () => {
  return (
    <div className="space-y-3">
      <div className="h-6 w-1/3 animate-pulse rounded bg-slate-200" />
      <div className="h-40 animate-pulse rounded bg-slate-200" />
    </div>
  )
}

export default LoadingSkeleton
