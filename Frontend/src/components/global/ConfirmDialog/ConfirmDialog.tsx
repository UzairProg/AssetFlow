import React, { createContext, useContext, useState, type FC, type ReactNode } from 'react'

type ConfirmOptions = { title?: string; description?: string; confirmText?: string; cancelText?: string }

const ConfirmContext = createContext<{
  open: (opts: ConfirmOptions, cb: (confirmed: boolean) => void) => void
}>({ open: () => {} })

export const useConfirm = () => useContext(ConfirmContext)

export const ConfirmProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null)
  const [cb, setCb] = useState<((c: boolean) => void) | null>(null)

  const open = (options: ConfirmOptions, callback: (confirmed: boolean) => void) => {
    setOpts(options)
    setCb(() => callback)
  }

  const close = (confirmed: boolean) => {
    if (cb) cb(confirmed)
    setOpts(null)
    setCb(null)
  }

  return (
    <ConfirmContext.Provider value={{ open }}>
      {children}
      {opts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-[#0F172A]">{opts.title || 'Confirm'}</h3>
            <p className="mb-4 text-sm text-[#64748B]">{opts.description || 'Are you sure?'}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => close(false)} className="rounded-2xl border border-[#E5E7EB] px-4 py-2">{opts.cancelText || 'Cancel'}</button>
              <button onClick={() => close(true)} className="rounded-2xl bg-[#DC2626] px-4 py-2 text-white">{opts.confirmText || 'Confirm'}</button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  )
}

export default ConfirmProvider
