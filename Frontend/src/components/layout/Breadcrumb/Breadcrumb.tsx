import { ChevronRight } from 'lucide-react'

import useBreadcrumb from '../../../hooks/useBreadcrumb/useBreadcrumb'
import { goToPath } from '../../../lib/demoAuth'

const Breadcrumb = () => {
  const items = useBreadcrumb()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={item.href} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-slate-300" /> : null}
            {isLast ? (
              <span aria-current="page" className="font-semibold text-slate-900">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => goToPath(item.href)}
                className="rounded-2xl px-1 py-0.5 transition hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {item.label}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
