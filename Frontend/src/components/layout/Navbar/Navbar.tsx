import { Menu, Settings2 } from 'lucide-react'

import AppContainer from '../AppContainer/AppContainer'
import NotificationDropdown from '../NotificationDropdown/NotificationDropdown'
import SearchBar from '../SearchBar/SearchBar'
import UserMenu from '../UserMenu/UserMenu'
import useSidebar from '../../../hooks/useSidebar/useSidebar'

const Navbar = () => {
  const { openMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <AppContainer>
        <div className="flex h-[72px] items-center gap-4">
          <button
            type="button"
            onClick={openMobile}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-blue-900 lg:hidden"
            aria-label="Open navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden min-w-[220px] lg:block">
            <SearchBar />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <button
              type="button"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-blue-900 sm:inline-flex"
              aria-label="Settings shortcut"
            >
              <Settings2 className="h-5 w-5" />
            </button>
            <div className="hidden text-right xl:block">
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
