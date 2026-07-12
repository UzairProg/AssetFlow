import React, { createContext, useContext, useState, type FC, type ReactNode } from 'react'

type Toast = { id: string; message: string; type?: 'info' | 'success' | 'error' | 'warning' }

const ToastContext = createContext<{
  toasts: Toast[]
  push: (t: Omit<Toast, 'id'>) => void
  remove: (id: string) => void
}>({ toasts: [], push: () => {}, remove: () => {} })

export const useToast = () => useContext(ToastContext)

export const ToastProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = (t: Omit<Toast, 'id'>) => {
    const id = String(Date.now())
    setToasts((s) => [...s, { id, ...t }])
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 5000)
  }

  const remove = (id: string) => setToasts((s) => s.filter((x) => x.id !== id))

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-3">
        {toasts.map((t) => (
          <div key={t.id} className={`rounded-2xl border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm`} role="status">
            <div className="text-sm text-[#0F172A]">{t.message}</div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastProvider
