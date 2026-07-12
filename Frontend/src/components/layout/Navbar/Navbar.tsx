import { Menu, Settings2 } from 'lucide-react'

import AppContainer from '../AppContainer/AppContainer'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'
import SearchBar from '../SearchBar/SearchBar'
import UserMenu from '../UserMenu/UserMenu'
import useSidebar from '../../../hooks/useSidebar/useSidebar'

const Navbar = () => {
  const { openMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/96 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md">
      <AppContainer>
        <div className="flex h-20 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={openMobile}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 lg:hidden"
            aria-label="Open navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden min-w-[240px] flex-1 lg:block xl:max-w-2xl">
            <SearchBar />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 lg:ml-auto">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:inline-flex"
              aria-label="Settings shortcut"
            >
              <Settings2 className="h-5 w-5" />
            </button>
            <div className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-right xl:block">
              <p className="text-sm font-semibold text-slate-900">Mon, 12 Jul 2026</p>
              <p className="text-xs text-slate-500">Enterprise Operations</p>
            </div>
            <NotificationDropdown />
            <UserMenu />
          </div>
        </div>
      </AppContainer>
    </header>
  )
}

export default Navbar
