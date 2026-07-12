import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

import { footerLinkGroups } from '../data'
import { BrandMark, containerClass } from '../shared'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className={`${containerClass} py-14 lg:py-16`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="space-y-6">
            <BrandMark />
            <p className="max-w-md text-sm leading-7 text-slate-600">
              AssetFlow helps organizations manage physical assets and shared resources
              with a premium enterprise experience that stays clear, secure, and fast.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaXTwitter, label: 'X / Twitter' },
                { icon: FaLinkedinIn, label: 'LinkedIn' },
                { icon: FaGithub, label: 'GitHub' },
                { icon: FaYoutube, label: 'YouTube' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <motion.a
                    key={item.label}
                    href="#home"
                    whileHover={{ y: -2 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-300 hover:bg-white hover:text-blue-900"
                    aria-label={item.label}
                  >
                    <Icon />
                  </motion.a>
                )
              })}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-slate-600">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#home" className="transition hover:text-slate-900">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 AssetFlow. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#home" className="transition hover:text-slate-900">
              Privacy
            </a>
            <a href="#home" className="transition hover:text-slate-900">
              Terms
            </a>
            <a href="#home" className="transition hover:text-slate-900">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer