import type { FC } from 'react'

type Props = {
  title?: string
  subtitle?: string
}

const PlaceholderPage: FC<Props> = ({ title = 'Coming Soon', subtitle = 'This page is not implemented yet.' }) => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
        <h2 className="mb-2 text-2xl font-semibold text-[#0F172A]">{title}</h2>
        <p className="text-sm text-[#64748B]">{subtitle}</p>
      </div>
    </main>
  )
}

export default PlaceholderPage
