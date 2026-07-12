import type { FC, ReactNode } from 'react'

const SettingsCard: FC<{ title?: string; children?: ReactNode }> = ({ title, children }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      {title && <h4 className="mb-3 text-sm font-semibold text-[#0F172A]">{title}</h4>}
      <div>{children}</div>
    </div>
  )
}

export default SettingsCard
