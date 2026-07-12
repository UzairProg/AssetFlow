import type { FC } from 'react'
import CrudManager from '../../components/global/CRUD/CrudManager'

type Props = {
  title?: string
  subtitle?: string
}

const PlaceholderPage: FC<Props> = ({ title = 'Coming Soon', subtitle = 'This page is not implemented yet.' }) => {
  const collectionKey = (title || 'placeholder').toLowerCase().replace(/\s+/g, '_')

  return (
    <main className="p-6">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-semibold text-[#0F172A]">{title}</h2>
        <p className="text-sm text-[#64748B] mb-4">{subtitle}</p>
        <CrudManager collection={collectionKey} title={title} />
      </div>
    </main>
  )
}

export default PlaceholderPage
