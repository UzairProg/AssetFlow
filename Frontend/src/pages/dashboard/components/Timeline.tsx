import type { FC } from 'react'

const Timeline: FC<{ items: { title: string; meta?: string; time?: string }[] }> = ({ items }) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600">{i + 1}</div>
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-[#0F172A]">{it.title}</div>
                {it.time ? <div className="text-xs text-[#64748B]">{it.time}</div> : null}
              </div>
              {it.meta ? <div className="mt-1 text-xs text-[#64748B]">{it.meta}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
