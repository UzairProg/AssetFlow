import React, { useEffect, useState, type FC } from 'react'

const commands = [
  { id: 'c1', title: 'Go to Dashboard', path: '/dashboard' },
  { id: 'c2', title: 'Create Asset', path: '/assets/create' },
  { id: 'c3', title: 'Open Reports', path: '/reports' },
]

const CommandPalette: FC = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = commands.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))

  if (!open) return null

  return (
    <div className="fixed left-0 right-0 top-20 z-50 flex justify-center">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-4 shadow-lg">
        <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search or press Ctrl+K" className="w-full rounded-2xl border border-[#E5E7EB] px-4 py-3 text-sm" />
        <div className="mt-3 max-h-64 overflow-auto">
          {results.map((r) => (
            <div key={r.id} className="cursor-pointer rounded-lg px-3 py-2 hover:bg-slate-50" onClick={() => (window.location.pathname = r.path)}>
              <div className="text-sm font-medium text-[#0F172A]">{r.title}</div>
              <div className="text-xs text-[#64748B]">{r.path}</div>
            </div>
          ))}
          {results.length === 0 && <div className="text-sm text-[#64748B]">No results</div>}
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
