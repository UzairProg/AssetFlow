import type { FC } from 'react'

const Avatar: FC<{ name: string; size?: number }> = ({ name, size = 36 }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="flex-shrink-0">
      <div style={{ width: size, height: size }} className="flex items-center justify-center rounded-full bg-blue-900 text-white font-semibold">
        {initials}
      </div>
    </div>
  )
}

export default Avatar
