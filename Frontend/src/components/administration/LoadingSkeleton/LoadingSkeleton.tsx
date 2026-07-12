import type { FC } from 'react'

const LoadingSkeleton: FC = () => {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 w-1/3 rounded bg-gray-200" />
      <div className="h-20 w-full rounded bg-gray-200" />
    </div>
  )
}

export default LoadingSkeleton
