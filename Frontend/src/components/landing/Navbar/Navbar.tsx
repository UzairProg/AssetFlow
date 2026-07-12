import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi'

import { navigationItems } from '../data'
import { goToPath } from '../../../lib/demoAuth'
import { BrandMark, cn, containerClass } from '../shared'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'border-b border-slate-200 bg-white shadow-sm'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className={cn(containerClass, 'flex h-20 items-center justify-between gap-6')}>
        <a href="#home" aria-label="AssetFlow home">
          <BrandMark compact />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-slate-600 transition-colors hover:text-blue-900"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => goToPath('/login')}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-900"
          >
            Login
          </button>
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:bg-blue-800 hover:shadow-xl"
          >
            Get Started
            <FiArrowRight />
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-blue-900 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <div className={cn(containerClass, 'space-y-4 py-5')}>
              <div className="grid gap-3 sm:grid-cols-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-white hover:text-blue-900"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => goToPath('/login')}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => goToPath('/signup')}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold !text-white shadow-md"
                >
                  Get Started
                  <FiArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar