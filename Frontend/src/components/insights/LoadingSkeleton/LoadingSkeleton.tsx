import type { FC } from 'react'

const LoadingSkeleton: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-3/4 rounded bg-gray-200" />
      <div className="mt-2 h-40 w-full rounded bg-gray-200" />
    </div>
  )
}

export default LoadingSkeleton
