import { useState } from 'react'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react'

import useSidebar from '../../../hooks/useSidebar/useSidebar'
import { goToPath } from '../../../lib/demoAuth'
import { navigationGroups } from '../navigation'

const Sidebar = ({ mobile = false }: { mobile?: boolean }) => {
  const { collapsed, setCollapsed, closeMobile } = useSidebar()
  const [expanded, setExpanded] = useState<string[]>(['Organization', 'Assets'])

  const widthClass = mobile ? 'w-full' : collapsed ? 'w-[92px]' : 'w-[304px]'

  const activePath = window.location.pathname

  return (
    <motion.aside
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 30 }}
      className={`${widthClass} ${mobile ? 'h-full' : 'sticky top-0 h-screen'} flex flex-col border-r border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-all duration-300 ease-in-out`}
      aria-label="Sidebar navigation"
    >
      <div className="flex h-20 items-center justify-between border-b border-slate-200 px-4">
        <button
          type="button"
          onClick={() => goToPath('/dashboard')}
          className="flex items-center gap-3 rounded-2xl px-2 py-1 text-left transition hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-900 text-sm font-bold text-white shadow-sm shadow-blue-900/20">
            AF
          </div>
          {!collapsed || mobile ? (
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">AssetFlow</div>
              <p className="text-xs text-slate-500">ERP Workspace</p>
            </div>
          ) : null}
        </button>

        {!mobile ? (
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => {
          const Icon = group.icon
          const isExpanded = expanded.includes(group.label)
          const isActive = activePath === group.href || activePath.startsWith(`${group.href}/`)

          return (
            <div key={group.label} className="space-y-1">
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (group.children) {
                    setExpanded((current) =>
                      current.includes(group.label)
                        ? current.filter((item) => item !== group.label)
                        : [...current, group.label],
                    )
                  }
                  goToPath(group.href)
                  if (mobile) closeMobile()
                }}
                aria-expanded={group.children ? isExpanded : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  isActive
                    ? 'border-blue-100 bg-blue-50 text-blue-900 shadow-sm shadow-blue-900/5'
                    : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-blue-900'
                }`}
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ring-1 transition ${isActive ? 'bg-white text-blue-900 ring-blue-100' : 'bg-white text-slate-500 ring-slate-200 group-hover:text-blue-900'}`}>
                  <Icon className="h-4 w-4" />
                </span>
                {!collapsed || mobile ? <span className="flex-1">{group.label}</span> : null}
                {group.children && (!collapsed || mobile) ? (
                  <ChevronDown className={`h-4 w-4 transition ${isExpanded ? 'rotate-180' : ''}`} />
                ) : null}
              </motion.button>

              {group.children && isExpanded && (!collapsed || mobile) ? (
                <div className="space-y-1 pl-12 pr-1">
                  {group.children.map((item) => {
                    const childActive = activePath === item.href || activePath.startsWith(`${item.href}/`)
                    return (
                      <motion.button
                        key={item.label}
                        type="button"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          goToPath(item.href)
                          if (mobile) closeMobile()
                        }}
                        className={`flex w-full items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                          childActive
                            ? 'border-blue-100 bg-white font-semibold text-blue-900 shadow-sm shadow-blue-900/5'
                            : 'border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-blue-900'
                        }`}
                      >
                        <ChevronRight className={`h-3.5 w-3.5 ${childActive ? 'text-blue-700' : 'text-slate-300'}`} />
                        {item.label}
                      </motion.button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={() => goToPath('/login')}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 ring-1 ring-slate-200">
            <LogOut className="h-4 w-4" />
          </span>
          {!collapsed || mobile ? <span>Sign out</span> : null}
        </button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
