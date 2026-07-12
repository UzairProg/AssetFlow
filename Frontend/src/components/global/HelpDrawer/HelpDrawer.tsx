import React, { useState, type FC } from 'react'

const HelpDrawer: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-40 rounded-full bg-[#1E3A8A] p-3 text-white">?</button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <aside className="relative ml-auto w-full max-w-md bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#0F172A]">Help & Support</h3>
              <button onClick={() => setOpen(false)} className="text-sm text-[#64748B]">Close</button>
            </div>
            <div className="mt-4 text-sm text-[#64748B]">Search knowledge base, FAQs and quick guides.</div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default HelpDrawer
