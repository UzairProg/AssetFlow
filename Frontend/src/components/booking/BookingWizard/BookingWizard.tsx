import type { FC } from 'react'
import { useState } from 'react'

const BookingWizard: FC = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="mb-4 text-sm font-medium text-[#64748B]">Step {step} of 4</div>
      <div className="space-y-4">
        {step === 1 && <div>Select Resource — placeholder form controls</div>}
        {step === 2 && <div>Select Date & Time — placeholder</div>}
        {step === 3 && <div>Participants & Details — placeholder</div>}
        {step === 4 && <div>Review & Confirm — placeholder</div>}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button type="button" onClick={() => setStep((s) => Math.max(1, s - 1))} className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm text-[#1E3A8A]">Back</button>
        <button type="button" onClick={() => setStep((s) => Math.min(4, s + 1))} className="rounded-2xl bg-[#1E3A8A] px-3 py-2 text-sm text-white">Next</button>
      </div>
    </div>
  )
}

export default BookingWizard
