import { ChevronRight } from 'lucide-react'

import useBreadcrumb from '../../../hooks/useBreadcrumb/useBreadcrumb'

const Breadcrumb = () => {
  const items = useBreadcrumb()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={item.href} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5 text-slate-300" /> : null}
            <a
              href={item.href}
              aria-current={isLast ? 'page' : undefined}
              className={isLast ? 'font-semibold text-slate-900' : 'transition hover:text-blue-900'}
            >
              {item.label}
            </a>
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
